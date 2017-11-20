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
    let values = $(this).serialize();
    let posting = $.post(this.action, values);
    posting.success(function(data) {
      let task = new Task(data);
      let taskLI = task.renderLI();
      if (task.description) {
        if ($("#task_sort").prop("disabled")) {
          $("#task_sort").prop("disabled", false);
        }
        $("#edit-selected").append(taskLI);
        document.getElementById("new_task").reset();

        // update incomplete tasks counter in list show view
        let element = document.getElementById("number-of-incomplete-tasks");
        if (element) {
          let num = parseInt(element.innerHTML);
          element.innerHTML = num + 1;
        }
        // update incomplete tasks counter in nav lists menu
        let elementNav = document.querySelector("#new-list-nav-json a.active span");
        let numNav = parseInt(elementNav.innerHTML);
        if (numNav) {
          elementNav.innerHTML = numNav + 1;
        } else {
          elementNav.innerHTML = 1;
        }
      }
    });
  });
});


// helper to select class for task list item
Handlebars.registerHelper('li_class_for_task', function() {
  let window_url_array = window.location.pathname.split('/');
  let window_list_id = window_url_array[2];
  let window_task_id = window_url_array[4];
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
  let userInitials = this.assigned_user.name.replace(/\W*(\w)\w*/g, '$1').toUpperCase();
  return new Handlebars.SafeString("<span class='label label-success'><i class='fa fa-user-circle fa-fw' aria-hidden='true'></i>" + userInitials + "</span>");
});

// helper to display task due date in calendar tooltip
Handlebars.registerHelper('display_calendar_tooltip', function() {
  let today = new Date(new Date().setHours(0, 0, 0, 0));
  let tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
  let due_date = this.due_date.replace(/-/g, '/');
  let due_date_object = new Date(due_date);

  if (today > due_date_object && this.status === 0) {
    return new Handlebars.SafeString(`Overdue ${due_date}`);
  } else if (today.getTime() === due_date_object.getTime()) {
    return new Handlebars.SafeString("Due today");
  } else if (tomorrow.getTime() === due_date_object.getTime()) {
    return new Handlebars.SafeString("Due tomorrow");
  } else {
    return new Handlebars.SafeString(`Due on ${due_date}`);
  }
});

// helper to display task due date icon
Handlebars.registerHelper('display_calendar_icon', function() {
  let today = new Date(new Date().setHours(0, 0, 0, 0));
  let due_date = this.due_date.replace(/-/g, '/');
  let due_date_object = new Date(due_date);

  if (today > due_date_object) {
    return new Handlebars.SafeString("fa fa-calendar-times-o fa-fw text-danger");
  } else if (today.getTime() === due_date_object.getTime()) {
    return new Handlebars.SafeString("fa fa-calendar-check-o fa-fw text-warning");
  } else {
    return new Handlebars.SafeString("fa fa-calendar-o fa-fw");
  }
});

// renders tasks (from has_many relationship in list JSON) on list show page via jQuery and an Active Model Serialization JSON backend
document.addEventListener("turbolinks:load", function() {
  $("#task_sort").parents("form").submit(function(event) {
    event.preventDefault();
    let task_sort_value = $(this).serialize();
    let url_list_id = this.action.split('/')[4];
    let url = `/lists/${url_list_id}.json`;
    $.get(url, task_sort_value, function(data) {
      let template = Handlebars.compile(document.getElementById("tasks-template").innerHTML);
      let result = template(data.tasks);
      $("#edit-selected").html(result);
    });
  });
});


// helper to display users options for assign user to task selection
Handlebars.registerHelper('display_users_options', function() {
  let optionsHTML = "<option value>None</option>";
  let assignedUserId;
  if (this.assigned_user) {
    assignedUserId = this.assigned_user.id;
  }
  this.users.forEach(function(user) {
    if (user.id === assignedUserId) {
      optionsHTML += `<option selected='selected' value='${user.id}'>${user.name}</option>`;
    } else {
      optionsHTML += `<option value='${user.id}'>${user.name}</option>`;
    }
  });
  return new Handlebars.SafeString(optionsHTML);
});

// helper to set minimum date for task due date input
Handlebars.registerHelper('yesterday', function() {
  let today = new Date(new Date().setHours(0, 0, 0, 0));
  let yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));

  function formatDate(date) {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  return new Handlebars.SafeString(formatDate(yesterday));
});

// helper to display lists options for move task to another list selection
Handlebars.registerHelper('display_lists_options', function() {
  let optionsHTML = "";
  let listId = this.list_id;

  $.get('/lists.json', function(data) {
    data.forEach(function(list) {
      if (list.id === listId) {
        optionsHTML += `<option selected='selected' value='${list.id}'>${list.name}</option>`;
      } else {
        optionsHTML += `<option value='${list.id}'>${list.name}</option>`;
      }
    });
  });
  return new Handlebars.SafeString(optionsHTML);
  // return new Handlebars.SafeString("<option value='1'>House</option><option value='2'>Yard</option><option selected='selected' value='3'>Groceries</option><option value='4'>Work</option><option value='5'>Winter clothes</option><option value='14'>1 list</option><option value='18'>0 list</option><option value='23'>2 list</option><option value='24'>Z list</option>");
});

// renders task edit panel via jQuery and an Active Model Serialization JSON backend
document.addEventListener("turbolinks:load", function() {
  $(".js-next").on("click", function(event) {
    event.preventDefault();
    let nextId = parseInt($(".js-next").attr("data-id")) + 1;
    let listId = $(".js-next").attr("data-list-id");
    $.get(`/lists/${listId}/tasks/${nextId}/edit.json`, function(data) {
      let template = Handlebars.compile(document.getElementById("task-edit-template").innerHTML);
      let result = template(data);
      $("#edit-task-json").html(result);

      // re-set the id to current on the link
      $(".js-next").attr("data-id", data.id);
    });
  });
});
