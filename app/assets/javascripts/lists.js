// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

document.addEventListener("turbolinks:load", function() {
  $('#new_list').submit(function(event) {
    event.preventDefault();
    let values = $(this).serialize();
    let posting = $.post(this.action, values);
    posting.success(function(data) {
      let list = data;
      let template = Handlebars.compile(document.getElementById("list-template").innerHTML);
      let result = template(list);
      if (list.name) {
        document.getElementById("new-list-json").innerHTML += result;
        document.getElementById("new_list").reset();
      }
    });
  });
});
