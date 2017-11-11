// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

document.addEventListener("turbolinks:load", function() {
  $('#new_task').submit(function(event) {
    event.preventDefault();
    let values = $(this).serialize();
    let posting = $.post(this.action, values);
    posting.done(function(data) {
      let task = data;
      $("#taskDescription").text(task["description"]);
    });
  });
});
