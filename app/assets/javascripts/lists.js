// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
document.addEventListener("turbolinks:load", function() {
  $('#new_list').submit(function(event) {
    event.preventDefault();
    let values = $(this).serialize();
    let posting = $.post(this.action, values);
    posting.done(function(data) {
      let list = data;
      $("#listName").text(list["name"]);
      document.getElementById("new_list").reset();
    });
  });
});
