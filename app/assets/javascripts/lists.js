// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

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

document.addEventListener("turbolinks:load", function() {
  $("#listsSort").parents("form").submit(function(event) {
    event.preventDefault();
    $.get("/lists" + ".json", function(data) {
      let template = Handlebars.compile(document.getElementById("lists-template").innerHTML);
      let result = template(data);
      $("#new-list-json").html(result);
    })
  });
});
