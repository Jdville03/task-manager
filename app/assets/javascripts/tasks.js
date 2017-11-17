// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

// creates new task via an AJAX POST request and translates JSON response into JS model object which is rendered via Handlebars template

function Task(attributes) {
  this.id = attributes.id;
  this.description = attributes.description;
  this.list_id = attributes.list.id;
}

document.addEventListener("turbolinks:load", function() {
  Task.templateSource = document.getElementById("task-template").innerHTML;
  Task.template = Handlebars.compile(Task.templateSource);
});

Task.prototype.renderLI = function() {
  return Task.template(this);
}

document.addEventListener("turbolinks:load", function() {
  $("#task_description").parents("form").submit(function(event) {
    event.preventDefault();
    let values = $(this).serialize();
    let posting = $.post(this.action, values);
    posting.success(function(data) {
      let task = new Task(data);
      let taskLI = task.renderLI();
      if (task.description) {
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


// helper to display task name in delete alert
Handlebars.registerHelper('task_description_upper_case', function() {
  return new Handlebars.SafeString(this.description.toUpperCase());
});

// helper to display user initials for task user icon
Handlebars.registerHelper('display_icon_with_user_initials', function() {
  let userInitials = this.assigned_user.name.replace(/\W*(\w)\w*/g, '$1').toUpperCase();
  return new Handlebars.SafeString("<span class='label label-success'><i class='fa fa-user-circle fa-fw' aria-hidden='true'></i>" + userInitials + "</span>");
});

// helper to display task due date
Handlebars.registerHelper('display_task_due_date', function() {
  if (new Date() > this.due_date && this.status === 0) {
    return new Handlebars.SafeString(`Overdue ${this.due_date}`);
  } else if (new Date() === this.due_date) {
    return new Handlebars.SafeString("Due today");
  } else if (new Date().setDate(new Date().getDate() + 1) === this.due_date) {
    return new Handlebars.SafeString("Due tomorrow");
  } else {
    return new Handlebars.SafeString(`Due on ${this.due_date}`);
  }
});

// helper to display due date icon
Handlebars.registerHelper('display_due_date_icon', function() {
  if (new Date() > this.due_date) {
    return new Handlebars.SafeString("fa fa-calendar-times-o fa-fw text-danger");
  } else if (new Date() === this.due_date) {
    return new Handlebars.SafeString("fa fa-calendar-check-o fa-fw text-warning");
  } else {
    return new Handlebars.SafeString("fa fa-calendar-o fa-fw");
  }
});

// renders tasks index on list show page via jQuery and an Active Model Serialization JSON backend
document.addEventListener("turbolinks:load", function() {
  $("#task_sort").parents("form").submit(function(event) {
    event.preventDefault();
    let task_sort_value = $(this).serialize();
    let url = this.action;
    $.get(url + "/tasks.json", task_sort_value, function(data) {
      let template = Handlebars.compile(document.getElementById("tasks-template").innerHTML);
      let result = template(data);
      $("#edit-selected").html(result);
    });
  });
});
