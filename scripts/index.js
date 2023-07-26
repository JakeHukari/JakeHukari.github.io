$(function() {
    var isMobile;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      isMobile = true;
  
      // Mobile height
      $('.height-fix').each(function() {
        var h = $(this).height();
        $(this).height(h);
      });
    }
  
    $(window).resize(function() {
      posFilterBar($('.filter').first());
    });
  
    // Sticky Navigation Bar on Mobile
    if (isMobile) {
      $('nav').addClass('fixed');
    } else {
      $('nav').addClass('desk');
    }
  
    // Navigation Bar POS
    var navPos = $('nav').position().top;
    var lastPos = 0;
    var lockTimer;
  
    $(window).on('scroll', function() {
      var pos = $(window).scrollTop();
      var pos2 = pos + 50;
      var scrollBottom = pos + $(window).height();
  
      if (!isMobile) {
        if (pos >= navPos + $('nav').height() && lastPos < pos) {
          $('nav').addClass('fixed');
        }
        if (pos < navPos && lastPos > pos) {
          $('nav').removeClass('fixed');
        }
        lastPos = pos;
      }
  
      // Link Highlighting
      if (pos2 > $('#home').offset().top) {
        highlightLink('home');
      }
      if (pos2 > $('#about').offset().top) {
        highlightLink('about');
      }
      if (pos2 > $('#portfolio').offset().top) {
        highlightLink('portfolio');
      }
      if (
        pos2 > $('#contact').offset().top ||
        pos + $(window).height() === $(document).height()
      ) {
        highlightLink('contact');
      }
  
      // Prevent Hover on Scroll
      clearTimeout(lockTimer);
      if (!$('body').hasClass('disable-hover')) {
        $('body').addClass('disable-hover');
      }
  
      lockTimer = setTimeout(function() {
        $('body').removeClass('disable-hover');
      }, 500);
    });
  
    function highlightLink(anchor) {
      $('nav .active').removeClass('active');
      $('nav')
        .find('[dest="' + anchor + '"]')
        .addClass('active');
    }
  
    // EVENT HANDLERS
    $('.page-link').click(function() {
      var anchor = $(this).attr('dest');
      $('.link-wrap').removeClass('visible');
  
      $('nav span').removeClass('active');
      $('nav')
        .find('[dest="' + anchor + '"]')
        .addClass('active');
  
      $('html, body').animate(
        {
          scrollTop: $('#' + anchor).offset().top
        },
        400
      );
    });
  
    $('.mdi-menu').click(function() {
      $('.link-wrap').toggleClass('visible');
    });
    posFilterBar($('.filter').first());
  
    $('.filter').click(function() {
      posFilterBar(this);
    });
  
    function posFilterBar(elem) {
      var origin = $(elem)
        .parent()
        .offset().left;
      var pos = $(elem).offset().left;
      $('.float-bar').css({
        left: pos - origin,
        width: $(elem).innerWidth()
      });
      $('.float-bar .row').css('left', (pos - origin) * -1);
    }
  
    // GALLERY
    $('#gallery').mixItUp({});
  
    function mixClear() {
      setTimeout(function() {
        $('#gallery').removeClass('waypoint');
      }, 2000);
    }
  
    // Scroll Animation
    function onScrollInit(items, elemTrigger) {
      var offset = $(window).height() / 1.6;
      items.each(function() {
        var elem = $(this),
          animationClass = elem.attr('data-animation'),
          animationDelay = elem.attr('data-delay');
  
        elem.css({
          '-webkit-animation-delay': animationDelay,
          '-moz-animation-delay': animationDelay,
          'animation-delay': animationDelay
        });
  
        var trigger = elemTrigger ? trigger : elem;
  
        trigger.waypoint(
          function() {
            elem.addClass('animated').addClass(animationClass);
            if (elem.get(0).id === 'gallery') mixClear(); //OPTIONAL
          },
          {
            triggerOnce: true,
            offset: offset
          }
        );
      });
    }
  
    setTimeout(function() {
      onScrollInit($('.waypoint'));
    }, 10);
  
    // Contact Form
    $('#contact-form').submit(function(e) {
      e.preventDefault();
  
      $.ajax({
        url: 'https://formspree.io/f/meqvlkkq',
        method: 'POST',
        data: { message: $('form').serialize() },
        dataType: 'json'
      }).done(function(response) {
        $('#success').addClass('expand');
        $('#contact-form')
          .find('input[type=text], input[type=email], textarea')
          .val('');
      });
    });
  
    $('#close').click(function() {
      $('#success').removeClass('expand');
    });
  });
  
//document.addEventListener('keydown', (event) => {
//    if (event.key == 'ArrowUp') {
//      alert('You pressed the up arrow!');
//    }
//});
//
//document.addEventListener('keydown', (event) => {
//  if (event.key == 'ArrowDown') {
//    alert('You pressed the down arrow!');
//  }
//});
//
//document.addEventListener('keydown', (event) => {
//  if (event.key == 'ArrowLeft') {
//    alert('You pressed the left arrow!');
//  }
//});
//
//document.addEventListener('keydown', (event) => {
//  if (event.key == 'ArrowRight') {
//    alert('You pressed the right arrow!');
//  }
//});
