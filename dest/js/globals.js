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

// endow slider
$(function () {
  addSwiper('.endow-slider', {
    navigation: true,
    speed: 800,
    loop: true,
    autoHeight: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    }
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
  var bannerSlider = addSwiper('.banner-slider', {
    init: false,
    pagination: true,
    speed: 800,
    loop: true,
    autoHeight: true,
    effect: 'fade',
    autoplay: {
      delay: 9000,
      disableOnInteraction: false
    }
  })[0];

  if (!bannerSlider) {
    return;
  }

  bannerSlider.on('init', function () {
    $('.banner-slider').addClass('animating');
  });

  bannerSlider.init();
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
  $(".filter__dropdown-toggle").on("click", function (e) {
    e.stopPropagation();
    $(this).toggleClass("active");
    $(this).siblings(".filter__dropdown-menu").toggle();

    $(".filter__dropdown-menu").not($(this).siblings(".filter__dropdown-menu")).hide();

    if ($(this).hasClass("active")) {
      $(".js-datepicker").datepicker({
        autoclose: true,
        startDate: "+0d"
      });

      numberInput(".js-quantity-value");

      $(".js-quantity-btn").on("click", function () {
        var plus = $(this).data("plus");
        var input = $(this).closest(".js-quantity").find(".js-quantity-value");
        var value = input.val();
        var newValue = parseInt(value) + plus;

        var minVal = 0;

        if (input.hasClass("js-adult")) {
          minVal = 1;
        }

        if (newValue >= minVal) {
          input.val(newValue);
          input.trigger("change");
        }
      });

      $(".js-checkin").on("change", function () {
        $(".js-checkout").focus();
      });

      $(".js-checkout").on("change", function () {
        var checkin = $(".js-checkin").val();
        var checkout = $(".js-checkout").val();

        if (checkin == "") {
          $(".js-checkin").focus();
        } else {
          $(".filter__dropdown-menu").hide();
          $(".js-room-timing").html(`${checkin} - ${checkout}`);
        }
      });

      $(".js-children, .js-adult").on("change keyup", function () {
        var value = $(this).val();

        if (value == "") {
          $(this).val(0);
          value = 0;

          if ($(this).hasClass("js-adult")) {
            $(this).val(1);
            value = 1;
          }
        }

        var children = $(".js-children").val();
        var adult = $(".js-adult").val();

        if (adult < 10) {
          adult = "0" + adult;
        }

        if (children > 0 && children < 10) {
          children = "0" + children;
        }

        console.log("abc");

        $(".js-people").html(`${adult} người lớn, ${children} trẻ em`);
      });
    }
  });

  $("html, body").on("click", function () {
    $(".filter__dropdown-menu").hide();
    $(".filter__dropdown-toggle").removeClass("active");

    var checkin = $(".js-checkin").val();
    var checkout = $(".js-checkout").val();

    if (!(checkin && checkout)) {
      $(".js-room-timing").html("Checkin - Checkout");
    }
  });

  $(".filter__dropdown-menu").on("click", function (e) {
    e.stopPropagation();
  });
});

$(function () {
  $(".md-booking").on("shown.bs.modal", function () {
    $(this).find(".js-datepicker").datepicker({
      autoclose: true,
      startDate: "+0d"
    });
  });
});

function numberInput(className) {
  var input = $(className);
  input.keydown(function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode >= 35 && e.keyCode <= 39) {
      return;
    }
    if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });
}

$(function () {
  $(".js-room-booking").on("click", function (e) {
    e.preventDefault();
    var id = $(this).data("roomId");
    $(".js-room-id").val(id);
    $(".md-booking").modal("show");
  });
});

$(function () {
  $(".conference__frame").on("mouseenter", function () {
    var src = $(this).data("zoom");
    $(".conference__zoom").attr("src", src).show();
  }).on("mouseleave", function () {
    $(".conference__zoom").attr("src", "").hide();
  });
});

$(function () {
  if ($(window).width() < 768) {
    $(".sticky").addClass("hide");
  }

  $(".js-sticky-tab").on("click", function (e) {
    e.stopImmediatePropagation();
    e.preventDefault();

    if ($(this).hasClass("active")) {
      $(".sticky").toggleClass("hide");
    } else {
      $(this).tab("show");
      $(".sticky").removeClass("hide");
    }
  });

  $(".sticky__content").on("click", function (e) {
    e.stopPropagation();
  });

  $("html, body").on("click", function (e) {
    $(".sticky").addClass("hide");
  });
});

$(function () {
  $(".js-search-toggle").on("click", function (e) {
    if ($(window).width() < 1200) {
      return;
    }
    e.stopPropagation();
    $(".js-search").addClass("show");
    $(".js-search").find(".form-control").focus();
  });

  $(".js-search").on("click", function (e) {
    e.stopPropagation();
  });

  $("html, body").on("click", function () {
    if ($(window).width() < 1200) {
      return;
    }
    $(".js-search").removeClass("show");
  });
});