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
      let templateNav = Handlebars.compile(document.getElementById("list-template-lists-nav").innerHTML);
      let result = template(list);
      let resultNav = templateNav(list);
      if (list.name) {
        $("#new-list-json").append(result);
        document.getElementById("new_list").reset();
        $("#new-list-nav-json").append(resultNav);
      }
    });
  });
});
