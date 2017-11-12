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
        document.getElementById("edit-selected").innerHTML += result;
        document.getElementById("new_task").reset();
      }
    });
  });
});
