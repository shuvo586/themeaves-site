/* Aonomy Preloader */

jQuery(window).load(function() {
  $(".aonomy-preloader").fadeOut("slow");
});

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */

particlesJS.load('particles-js', 'assets/json/particles.json', function() {
  console.log('callback - particles.js config loaded');
});

/* Aonomy Smooth Scroll - same-page anchors only */

$('a[href^="#"]').click(function(e) {
  var target = $(this).attr('href');
  if ($(target).length) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $(target).offset().top - 158
    }, 1000);
  }
});