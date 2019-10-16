// navbar mobile toggle
$(function () {
  var $body = $('html, body');
  var $navbar = $('.js-navbar');

  $('.js-navbar-open').on('click', function () {
    $navbar.addClass('is-show');
    $body.addClass('overflow-hidden');
  });

  $('.js-navbar-close').on('click', function () {
    $navbar.removeClass('is-show');
    $body.removeClass('overflow-hidden');
  });
});

// menu toggle
$(function () {
  $('.menu-toggle').on('click', function () {
    var $toggle = $(this);

    $toggle.toggleClass('active').siblings('.menu-sub').slideToggle();

    $toggle.parent().siblings('.menu-item-group').children('.menu-sub').slideUp();

    $toggle.parent().siblings('.menu-item-group').children('.menu-toggle').removeClass('active');
  });
});

// spa slider
$(function () {
  if (!$('.spa-slider').length) {
    return;
  }

  var loopedSlides = $('.spa-slider').find('.swiper-slide').length;

  var spaSlider = addSwiper('.spa-slider', {
    navigation: true,
    speed: 800,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }
  })[0];

  var imgSlider = addSwiper('.spa-img-slider', {
    effect: 'fade',
    loop: true
  })[0];

  imgSlider.controller.control = spaSlider;
  spaSlider.controller.control = imgSlider;
});

// room slider
$(function () {
  addSwiper('.room-slider', {
    navigation: true,
    effect: 'fade',
    speed: 800,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }
  });
});

// banner slider
$(function () {
  addSwiper('.banner-slider', {
    pagination: true,
    speed: 800,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }
  });
});

// swiper template
function addSwiper(selector, options = {}) {
  return Array.from(document.querySelectorAll(selector), function (item) {
    var $sliderContainer = $(item),
        $sliderEl = $sliderContainer.find('.swiper-container');

    if (options.navigation) {
      $sliderContainer.addClass('has-nav');
      options.navigation = {
        prevEl: $sliderContainer.find(selector + '__prev'),
        nextEl: $sliderContainer.find(selector + '__next')
      };
    }

    if (options.pagination) {
      $sliderContainer.addClass('has-pagination');
      options.pagination = {
        el: $sliderContainer.find(selector + '__pagination'),
        clickable: true
      };
    }

    return new Swiper($sliderEl, options);
  });
}

$(function () {
  $('.conference__frame').on('mouseenter', function () {
    var src = $(this).data('zoom');
    $('.conference__zoom').attr('src', src).show();
  }).on('mouseleave', function () {
    $('.conference__zoom').attr('src', '').hide();
  });
});

$(function () {
  $('.js-sticky-tab').on('click', function (e) {
    e.stopImmediatePropagation();
    e.preventDefault();

    if ($(this).hasClass('active')) {
      $('.sticky').toggleClass('hide');
    } else {
      $(this).tab('show');
      $('.sticky').removeClass('hide');
    }
  });
});

$(function () {
  $('.js-search-toggle').on('click', function (e) {
    if ($(window).width() < 1200) {
      return;
    }
    e.stopPropagation();
    $('.js-search').addClass('show');
    $('.js-search').find('.form-control').focus();
  });

  $('.js-search').on('click', function (e) {
    e.stopPropagation();
  });

  $('html, body').on('click', function () {
    if ($(window).width() < 1200) {
      return;
    }
    $('.js-search').removeClass('show');
  });
});