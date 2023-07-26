$(document).ready(function() {
  // Modal.js
  var modalText = {
    logger: {
      title: 'logger',
      tag: 'Logger for Windows that disguises itself as a simple .exe file',
      detail:
        'This program is perfect for DuckyScripts and Social Engineers who want to quickly and easily install a remote access tool on any Windows computer.',
      link: 'https://github.com/Krypt0c/Logger'
    },
    Linky: {
      title: 'Linky',
      tag: 'Your new favorite link tool.',
      detail:
        'Linky is a tool you can use to shorten or create custom URLs, this is a great social engineering tool to make links appear as something that they are not.',
      link: 'https://github.com/Krypt0c/linky'
    },
    Basilisk: {
      title: 'Basilisk',
      tag: 'The best, most efficient, most effective, and most universal password brute-forcing tool',
      detail:
        'The best, most efficient, most effective, and most universal password brute-forcing tool.',
      link: 'https://github.com/Krypt0c/basilisk'
    },
    JsTweetBot: {
      title: 'JsTweetBot',
      tag: 'Bot for Twitter built in JS',
      detail:
        'A Twitter bot that uses Javascript to generate and Tweet a random number.',
      link: 'https://www.github.com/Krypt0c/JsTweetBot/'
    },
    PyTweetBot: {
      title: 'PyTweetBot',
      tag: 'Bot for Twitter built with python',
      detail:
        'Twitter Bot that generates a random number and tweets it',
      link: 'https://github.com/Krypt0c/PyTweetBot'
      },
    PyRecker: {
      title: 'PyRecker',
      tag: 'A simple python script to spam web requests',
      detail:
        'A simple python script to spam web requests, im also working on a JS version of this.',
      link: 'https://github.com/Krypt0c/PyRecker'
      },
    QRG: {
      title: 'QR Code Generator',
      tag: 'A qr code generator built with python',
      detail:
        'A simple python script to create a qr code.',
      link: 'https://github.com/Krypt0c/qr-code-generator'
      },
    Hukari: {
      title: 'Hukari.tech',
      tag: 'This website',
      detail:
        'A personal website I made for my self, probably some of my best work',
      link: 'https://www.hukari.tech/'
      },
      GB: {
        title: 'Game-barrier.games',
        tag: 'Indie Game Company',
        detail:
          'A website I built for a small indie game development company',
        link: 'https://game-barrier.games/'
        }
  };

  $('#gallery .button').on('click', function() {
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function() {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $('#next').click(function() {
    shiftSlide(-1);
  });
  $('#prev').click(function() {
    shiftSlide(1);
  });

  carousel.on('mousedown', function() {
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function() {
      dragEnd = event.pageX;
      $(this).css('transform', 'translateX(' + dragPos() + 'px)');
    });
    $(document).on('mouseup', function() {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup');
    carousel
      .off('mousemove')
      .addClass('transition')
      .css('transform', 'translateX(' + direction * slideWidth + 'px)');
    setTimeout(function() {
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition');
      carousel.css('transform', 'translateX(0px)');
    }, 700);
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link)
      $('#modal .button')
        .addClass('visible')
        .parent()
        .attr('href', modalText[id].link);

    $.each($('#modal li'), function(index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background:
          "url('img/slides/" + id + '-' + index + ".webp') center center/cover",
        backgroundSize: 'cover'
      });
    });
  }
});