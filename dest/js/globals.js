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
  addSwiper('.spa-slider', {
    navigation: true,
    // effect: 'fade',
    speed: 800,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    }
  });
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