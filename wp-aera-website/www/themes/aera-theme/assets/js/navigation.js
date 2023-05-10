(function ($, window, document, undefined) {
  'use strict';

  const mobileMenuBreakpoint = 1024;
  let winW = null;

  $(window).on('load resize orientationchange', function () {
    calcWinSizes();
    resizeMenu();
  });

  if ($('.aera-header').length) {
    $('.aera-header .menu-item-has-children > a').after(
      '<span class="dropdown-btn"></span>'
    );

    $('.aera-header')
      .find('.menu-item-has-children .dropdown-btn')
      .on('click', function (e) {
        e.stopPropagation();

        if (mobileMenuBreakpoint >= winW) {
          $(this).toggleClass('active');
          $(this).next('.sub-menu').slideToggle();
        }
      });

    if ($(window).width() > mobileMenuBreakpoint) {
      let position = $(window).scrollTop();

      $(window).scroll(function () {
        let scroll = $(window).scrollTop();

        if (scroll <= 0 && position <= 0) {
          $('.aera-header').css('background-color', 'transparent');
          $('.aera-header').css('position', 'absolute');
          $('.aera-header').css('padding', '60px 0');
          $('.aera-header').css('top', '0');
        } else if (scroll > position && scroll !== 0) {
          $('.aera-header').css('background-color', 'transparent');
          $('.aera-header').css('position', 'absolute');
          $('.aera-header').css('padding', '60px 0');
          $('.aera-header').css('top', '-175px');
        } else if (scroll == 0) {
          $('.aera-header').css('background-color', 'transparent');
          $('.aera-header').css('position', 'absolute');
          $('.aera-header').css('padding', '60px 0');
          $('.aera-header').css('top', '0px');
        } else if (scroll <= 60) {
          $('.aera-header').css('background-color', 'transparent');
          $('.aera-header').css('position', 'fixed');
          $('.aera-header').css('padding', '60px 0');
          $('.aera-header').css('top', '0px');
        } else {
          $('.aera-header').css('background-color', '#fff');
          $('.aera-header').css('position', 'fixed');
          $('.aera-header').css('padding', '40px 0 40px');
          $('.aera-header').css('top', '0px');
        }

        position = scroll;
      });
    }
  }

  $('.aera-header__hamburger').on('click', function (e) {
    e.preventDefault();

    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
      $('html').addClass('no-scroll');
      $('body').addClass('sidebar-open');
      $('.aera-header').addClass('menu-open');
      $('.aera-header__menu').addClass('menu-open');
    } else {
      $('html').removeClass('no-scroll');
      $('body').removeClass('sidebar-open');
      $('.aera-header').removeClass('menu-open');
      $('.aera-header__menu').removeClass('menu-open');
    }
  });

  function calcWinSizes() {
    winW = window.innerWidth;
  }

  function resizeMenu() {
    if (
      $(window).width() > mobileMenuBreakpoint &&
      $('html').hasClass('no-scroll')
    ) {
      $('html').removeClass('no-scroll').height('auto');
      $('.aera-header__hamburger').toggleClass('active');
    }
  }
})(jQuery, window, document);
