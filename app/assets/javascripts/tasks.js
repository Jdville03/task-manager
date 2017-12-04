// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

// creates new task via an AJAX POST request and translates JSON response into JS model object which is rendered via Handlebars template

function Task(attributes) {
  this.id = attributes.id;
  this.description = attributes.description;
  this.list_id = attributes.list.id;
}

document.addEventListener("turbolinks:load", function() {
  if (document.getElementById("task-template")) {
    Task.templateSource = document.getElementById("task-template").innerHTML;
    Task.template = Handlebars.compile(Task.templateSource);
  }
});

Task.prototype.renderLI = function() {
  return Task.template(this);
}

document.addEventListener("turbolinks:load", function() {
  $("#new_task").submit(function(event) {
    event.preventDefault();
    var values = $(this).serialize();
    var posting = $.post(this.action, values);
    posting.success(function(data) {
      var task = new Task(data);
      var taskLI = task.renderLI();
      if (task.description) {
        if ($("#task_sort").prop("disabled")) {
          $("#task_sort").prop("disabled", false);
        }
        $("#edit-selected").append(taskLI);
        document.getElementById("new_task").reset();

        // update incomplete tasks counter in list show view
        var element = document.getElementById("number-of-incomplete-tasks");
        if (element) {
          var num = parseInt(element.innerHTML);
          element.innerHTML = num + 1;
        }
        // update incomplete tasks counter in nav lists menu
        var elementNav = document.querySelector("#new-list-nav-json a.active span");
        var numNav = parseInt(elementNav.innerHTML);
        if (numNav) {
          elementNav.innerHTML = numNav + 1;
        } else {
          elementNav.innerHTML = 1;
        }
      }
    });
  });
});

// destroys task via an AJAX DELETE request and removes task LI from DOM

Task.prototype.destroy = function() {
  $("li#task-" + this.id).remove();
}

document.addEventListener("turbolinks:load", function() {
  $("body").on("click", "a.destroy", function(event) {
    var urlLink = $(this).attr("href");
    if (urlLink + "/edit" !== window.location.pathname) {
      event.preventDefault();
      event.stopPropagation();
      var confirmMessage = $(this).attr("data-confirm");
      if (confirm(confirmMessage)) {
        $.ajax({
          url: urlLink,
          dataType: "json",
          method: "DELETE"
        })
        .success(function(data) {
          var task = new Task(data);
          task.destroy()
        });
      }
    }
  });
});


// helper to select class for task list item
Handlebars.registerHelper('li_class_for_task', function() {
  var window_url_array = window.location.pathname.split('/');
  var window_list_id = window_url_array[2];
  var window_task_id = window_url_array[4];
  if (this.status === 1 && this.list_id === parseInt(window_list_id) && this.id === parseInt(window_task_id)) {
    return new Handlebars.SafeString("completed selected");
  } else if (this.status === 1) {
    return new Handlebars.SafeString("completed");
  } else if (this.list_id === parseInt(window_list_id) && this.id === parseInt(window_task_id)) {
    return new Handlebars.SafeString("selected");
  }
});

// helper to display task name in delete alert
Handlebars.registerHelper('task_description_upper_case', function() {
  return new Handlebars.SafeString(this.description.toUpperCase());
});

// helper to display user initials for task user icon
Handlebars.registerHelper('display_icon_with_user_initials', function() {
  var userInitials = this.assigned_user.name.replace(/\W*(\w)\w*/g, '$1').toUpperCase();
  return new Handlebars.SafeString("<span class='label label-success'><i class='fa fa-user-circle fa-fw' aria-hidden='true'></i>" + userInitials + " </span>");
});

// helper to display task due date in calendar tooltip
Handlebars.registerHelper('display_calendar_tooltip', function() {
  var today = new Date(new Date().setHours(0, 0, 0, 0));
  var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
  var due_date = this.due_date.replace(/-/g, '/');
  var due_date_object = new Date(due_date);

  if (today > due_date_object && this.status === 0) {
    return new Handlebars.SafeString("Overdue " + due_date);
  } else if (today.getTime() === due_date_object.getTime()) {
    return new Handlebars.SafeString("Due today");
  } else if (tomorrow.getTime() === due_date_object.getTime()) {
    return new Handlebars.SafeString("Due tomorrow");
  } else {
    return new Handlebars.SafeString("Due on " + due_date);
  }
});

// helper to display task due date icon
Handlebars.registerHelper('display_calendar_icon', function() {
  var today = new Date(new Date().setHours(0, 0, 0, 0));
  var due_date = this.due_date.replace(/-/g, '/');
  var due_date_object = new Date(due_date);

  if (today > due_date_object) {
    return new Handlebars.SafeString("fa fa-calendar-times-o fa-fw text-danger");
  } else if (today.getTime() === due_date_object.getTime()) {
    return new Handlebars.SafeString("fa fa-calendar-check-o fa-fw text-warning");
  } else {
    return new Handlebars.SafeString("fa fa-calendar-o fa-fw");
  }
});

// renders tasks (from has_many relationship in list JSON) on list show page via jQuery and an Active Model Serialization JSON backend upon sorting tasks
document.addEventListener("turbolinks:load", function() {
  $("#task_sort").parents("form").submit(function(event) {
    event.preventDefault();
    var task_sort_value = $(this).serialize();
    var url_list_id = this.action.split('/')[4];
    var url = "/lists/" + url_list_id + ".json";
    $.get(url, task_sort_value, function(data) {
      var template = Handlebars.compile(document.getElementById("tasks-template").innerHTML);
      var result = template(data.tasks);
      $("#edit-selected").html(result);
      $('[data-toggle="tooltip"]').tooltip();
    });
  });
});

// renders tasks (from has_many relationship in list JSON) on list show page via jQuery and an Active Model Serialization JSON backend upon toggling display completed tasks option
document.addEventListener("turbolinks:load", function() {
  $(".toggleCompletedTasks").parents("form").submit(function(event) {
    event.preventDefault();
    var task_toggle_value = $(this).serialize();
    var url_list_id = this.action.split('/')[4];
    var url = "/lists/" + url_list_id + ".json";
    $.get(url, task_toggle_value, function(data) {
      var template = Handlebars.compile(document.getElementById("tasks-template").innerHTML);
      var result = template(data.tasks);
      $("#edit-selected").html(result);
      $('[data-toggle="tooltip"]').tooltip();
    });
  });
});


// renders task edit panel via jQuery and an Active Model Serialization JSON backend (through list has_many tasks association) upon clicking next
document.addEventListener("turbolinks:load", function() {
  $(".js-next").on("click", function(event) {
    event.preventDefault();
    var currentId = parseInt($(".js-next").attr("data-id"));
    var listId = $(".js-next").attr("data-list-id");
    $.get("/lists/" + listId + ".json", function(data) {
      var tasks = data.tasks;
      var tasksIds = tasks.map(function(task) {
        return task.id;
      })
      var currentTaskIndex = tasksIds.indexOf(currentId);
      if (currentTaskIndex < tasks.length - 1) {
        var nextTaskIndex = currentTaskIndex + 1;
        var nextTask = tasks[nextTaskIndex];

        var template = Handlebars.compile(document.getElementById("task-edit-template").innerHTML);
        var result = template(nextTask);
        $("#edit-task-json li").first().replaceWith(result);

        $("#edit_task_" + currentId + "_panel input[name='authenticity_token']").val($('meta[name="csrf-token"]').attr('content'));
        $("#edit_task_" + currentId + "_panel").attr("action", "/lists/" + listId + "/tasks/" + nextTask.id);
        $("#edit_task_" + currentId + "_panel").attr("id", "edit_task_" + nextTask.id + "_panel");
        $(".taskDescription").val(nextTask.description);
        if (nextTask.users.length > 1) {
          var optionsHTML = "<option value>None</option>";
          var assignedUserId;
          if (nextTask.assigned_user) {
            assignedUserId = nextTask.assigned_user.id;
          }
          nextTask.users.forEach(function(user) {
            if (user.id === assignedUserId) {
              optionsHTML += "<option selected='selected' value='" + user.id + "'>" + user.name + "</option>";
            } else {
              optionsHTML += "<option value='" + user.id + "'>" + user.name + "</option>";
            }
          });
          $(".usersOptions").html(optionsHTML);
        }
        $(".taskDueDate").val(nextTask.due_date);
        $(".taskNote").val(nextTask.note);
        $("#deleteTask").data("confirm", "Do you really want to delete the " + nextTask.description.toUpperCase() + " task?");
        $("#deleteTask").attr("href", "/lists/" + listId + "/tasks/" + nextTask.id);

        // update class for task LI
        $("#task-" + currentId).removeClass("selected");
        $("#task-" + nextTask.id).addClass("selected");

        // update URL
        history.pushState({}, '', "/lists/" + listId + "/tasks/" + nextTask.id + "/edit");

        // re-set the id to current on the link
        $(".js-next").attr("data-id", nextTask.id);
        $(".js-back").attr("data-id", nextTask.id);
      }
    });
  });
});


// renders task edit panel via jQuery and an Active Model Serialization JSON backend (through list has_many tasks association) upon clicking back
document.addEventListener("turbolinks:load", function() {
  $(".js-back").on("click", function(event) {
    event.preventDefault();
    var currentId = parseInt($(".js-back").attr("data-id"));
    var listId = $(".js-back").attr("data-list-id");
    $.get("/lists/" + listId + ".json", function(data) {
      var tasks = data.tasks;
      var tasksIds = tasks.map(function(task) {
        return task.id;
      })
      var currentTaskIndex = tasksIds.indexOf(currentId);
      if (currentTaskIndex > 0) {
        var previousTaskIndex = currentTaskIndex - 1;
        var previousTask = tasks[previousTaskIndex];

        var template = Handlebars.compile(document.getElementById("task-edit-template").innerHTML);
        var result = template(previousTask);
        $("#edit-task-json li").first().replaceWith(result);

        $("#edit_task_" + currentId + "_panel input[name='authenticity_token']").val($('meta[name="csrf-token"]').attr('content'));
        $("#edit_task_" + currentId + "_panel").attr("action", "/lists/" + listId + "/tasks/" + previousTask.id);
        $("#edit_task_" + currentId + "_panel").attr("id", "edit_task_" + previousTask.id + "_panel");
        $(".taskDescription").val(previousTask.description);
        if (previousTask.users.length > 1) {
          var optionsHTML = "<option value>None</option>";
          var assignedUserId;
          if (previousTask.assigned_user) {
            assignedUserId = previousTask.assigned_user.id;
          }
          previousTask.users.forEach(function(user) {
            if (user.id === assignedUserId) {
              optionsHTML += "<option selected='selected' value='" + user.id + "'>" + user.name + "</option>";
            } else {
              optionsHTML += "<option value='" + user.id + "'>" + user.name + "</option>";
            }
          });
          $(".usersOptions").html(optionsHTML);
        }
        $(".taskDueDate").val(previousTask.due_date);
        $(".taskNote").val(previousTask.note);
        $("#deleteTask").data("confirm", "Do you really want to delete the " + previousTask.description.toUpperCase() + " task?");
        $("#deleteTask").attr("href", "/lists/" + listId + "/tasks/" + previousTask.id);

        // update class for task LI
        $("#task-" + currentId).removeClass("selected");
        $("#task-" + previousTask.id).addClass("selected");

        // update URL
        history.pushState({}, '', "/lists/" + listId + "/tasks/" + previousTask.id + "/edit");

        // re-set the id to current on the link
        $(".js-back").attr("data-id", previousTask.id);
        $(".js-next").attr("data-id", previousTask.id);
      }
    });
  });
});
