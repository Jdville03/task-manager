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
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require turbolinks
//= require_tree .

window.setTimeout(function () {
  $(".alert-success").fadeTo(500, 0).slideUp(500, function () {
    $(this).remove();
  });
}, 3000);

document.addEventListener("turbolinks:load", function() {
  $('a[data-toggle="collapse"]').click(function(e){
    if ($(window).width() >= 768){
      e.stopPropagation();
    }
  })
  $("input.toggle-status,input.toggle-priority,.edit-input").on("change", function(){
    $(this).parents("form").trigger("submit")
  })
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
});

$(window).resize(function(){
  if ($(window).width() >= 768){
    $('.panel-collapse').addClass('in');
  }
  if ($(window).width() <= 768){
    $('.panel-collapse').removeClass('in');
  }
});
