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
  $('#new_task').submit(function(event) {
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

// renders tasks on list show page via jQuery and an Active Model Serialization JSON backend (list has_many tasks)

document.addEventListener("turbolinks:load", function() {
  $("#task_sort").parents("form").submit(function(event) {
    event.preventDefault();
    let task_sort_value = $(this).serialize();
    let url = this.action;
    $.get(url + ".json", task_sort_value, function(data) {
      // alert(task_sort_value);
      let template = Handlebars.compile(document.getElementById("tasks-template").innerHTML);
      let tasks = data.tasks
      // alert(tasks);
      let result = template(tasks);
      $("#edit-selected").html(result);
    });
  });
});
