// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

// creates new list via an AJAX POST request and translates JSON response into JS model object which is rendered via Handlebars template

function List(attributes) {
  this.id = attributes.id;
  this.name = attributes.name;
}

document.addEventListener("turbolinks:load", function() {
  if (document.getElementById("list-template")) {
    List.templateSource = document.getElementById("list-template").innerHTML;
    List.template = Handlebars.compile(List.templateSource);
  }
  if (document.getElementById("list-template-lists-nav")) {
    List.templateSourceNav = document.getElementById("list-template-lists-nav").innerHTML;
    List.templateNav = Handlebars.compile(List.templateSourceNav);
  }
});

List.prototype.renderLink = function() {
  return List.template(this);
}

List.prototype.renderLinkNav = function() {
  return List.templateNav(this);
}

document.addEventListener("turbolinks:load", function() {
  $('#new_list').submit(function(event) {
    event.preventDefault();
    var values = $(this).serialize();
    var posting = $.post(this.action, values);
    posting.success(function(data) {
      var list = new List(data);
      var listLink = list.renderLink();
      var listLinkNav = list.renderLinkNav();
      if (data.name) {
        $("#new-list-json").append(listLink);
        document.getElementById("new_list").reset();
        if ($("#new-list-nav-json").html().includes("</a>")) {
          $("#new-list-nav-json").append(listLinkNav);
        } else {
          $("#new-list-nav-json").html(listLinkNav);
          $("#listsSort").prop("disabled", false);
        }
      }
    });
  });
});


// helper to display number of incomplete tasks in lists index template
Handlebars.registerHelper('number_of_incomplete_tasks', function() {
  var incompleteTasks = this.tasks.filter(function(task) {
    return task.status === 0;
  });
  if (incompleteTasks.length) {
    return new Handlebars.SafeString("<span class='badge'>" + incompleteTasks.length + "</span>");
  }
});

// renders lists index via jQuery and an Active Model Serialization JSON backend upon sorting lists
document.addEventListener("turbolinks:load", function() {
  $("#listsSort").parents("form").submit(function(event) {
    event.preventDefault();
    var list_sort_value = $(this).serialize();
    $.get("/lists" + ".json", list_sort_value, function(data) {
      var template = Handlebars.compile(document.getElementById("lists-template").innerHTML);
      var templateNav = Handlebars.compile(document.getElementById("lists-template-lists-nav").innerHTML);
      var result = template(data);
      var resultNav = templateNav(data);
      $("#new-list-json").html(result);
      $("#new-list-nav-json").html(resultNav);
    });
  });
});
