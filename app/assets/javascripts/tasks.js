// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

document.addEventListener("turbolinks:load", function() {
  $('#new_task').submit(function(event) {
    event.preventDefault();
    let values = $(this).serialize();
    let posting = $.post(this.action, values);
    posting.success(function(data) {
      let task = data;
      let template = Handlebars.compile(document.getElementById("task-template").innerHTML);
      let result = template(task);
      if (task.description) {
        $("#edit-selected").append(result);
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
