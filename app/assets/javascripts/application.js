// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require js.cookie
//= require jstz
//= require browser_timezone_rails/set_time_zone
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require turbolinks
//= require_tree .

window.setTimeout(function() {
  $(".alert-success").fadeTo(500, 0).slideUp(500, function() {
    $(this).remove();
  });
}, 3000);

$(window).resize(function() {
  if ($(window).width() >= 768) {
    $('.panel-collapse').collapse('show');
  }
});

document.addEventListener("turbolinks:load", function() {
  $('a[data-toggle="collapse"]').click(function(e) {
    if ($(window).width() >= 768) {
      e.stopPropagation();
    }
  });
  $("body").on("change", "input.toggle-status", function() {
    $(this).parents("form").trigger("submit");
  });
  $("body").on("change", "input.toggle-priority", function() {
    $(this).parents("form").trigger("submit");
  });
  $("body").on("change", ".edit-input", function() {
    $(this).parents("form").trigger("submit");
  });
  $("body").on("change", ".lists-sort", function() {
    $(this).parents("form").trigger("submit");
  });
  $("body").on("change", ".tasks-sort", function() {
    $(this).parents("form").trigger("submit");
  });
  $('[data-toggle="tooltip"]').tooltip();
  $('#toggle-event').bootstrapToggle();
});

// block helper to allow user of comparison operator in Handlebars template
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
