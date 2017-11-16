// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

// creates new list via an AJAX POST request and translates JSON response into JS model object which is rendered via Handlebars template

function List(attributes) {
  this.id = attributes.id;
  this.name = attributes.name;
}

document.addEventListener("turbolinks:load", function() {
  List.templateSource = document.getElementById("list-template").innerHTML;
  List.template = Handlebars.compile(List.templateSource);
  List.templateSourceNav = document.getElementById("list-template-lists-nav").innerHTML;
  List.templateNav = Handlebars.compile(List.templateSourceNav);
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
    let values = $(this).serialize();
    let posting = $.post(this.action, values);
    posting.success(function(data) {
      let list = new List(data);
      let listLink = list.renderLink();
      let listLinkNav = list.renderLinkNav();
      if (data.name) {
        $("#new-list-json").append(listLink);
        document.getElementById("new_list").reset();
        if ($("#new-list-nav-json").html().includes("</a>")) {
          $("#new-list-nav-json").append(listLinkNav);
        } else {
          $("#new-list-nav-json").html(listLinkNav);
        }
      }
    });
  });
});

// renders lists index via jQuery and an Active Model Serialization JSON backend

// block helper to allow use of comparison operator in Handlebars template
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
  switch (operator) {
    case '==':
        return (v1 == v2) ? options.fn(this) : options.inverse(this);
    case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
    case '!=':
        return (v1 != v2) ? options.fn(this) : options.inverse(this);
    case '!==':
        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
    case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this);
    case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
    case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this);
    case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
    case '&&':
        return (v1 && v2) ? options.fn(this) : options.inverse(this);
    case '||':
        return (v1 || v2) ? options.fn(this) : options.inverse(this);
    default:
        return options.inverse(this);
  }
});

// helper to display number of incomplete tasks in lists index template
Handlebars.registerHelper('number_of_incomplete_tasks', function() {
  let incompleteTasks = this.tasks.filter(function(task) {
    return task.status === 0;
  });
  if (incompleteTasks.length) {
    return new Handlebars.SafeString("<span class='badge'>" + incompleteTasks.length + "</span>");
  }
});

document.addEventListener("turbolinks:load", function() {
  $("#listsSort").parents("form").submit(function(event) {
    event.preventDefault();
    let list_sort_value = $(this).serialize();
    $.get("/lists" + ".json", list_sort_value, function(data) {
      let template = Handlebars.compile(document.getElementById("lists-template").innerHTML);
      let result = template(data);
      if ($("#new-list-json")) {
        $("#new-list-json").html(result);
      }
    })
  });
});
