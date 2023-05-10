(function ($, window, document, undefined) {
  'use strict';

  $(window).on('DOMContentLoaded', function () {
    removeLoader();
  });

  function removeLoader() {
    $('.preloader').fadeOut(100, function () {
      $('.preloader').remove();
    });
  }

  checkSelectedResourcesWithURL();

  function checkSelectedResourcesWithURL() {
    let params = new URL(document.location).searchParams.get('category');

    if (params !== null) {
      const buttons = document.querySelectorAll('.aera-all-resources__filters-wrapper span');

      if (buttons.length) {
        buttons.forEach((button) => {
          let dataAttr = '';

          if (button.hasAttribute('data-cpt')) {
            dataAttr = button.getAttribute('data-cpt');
          }

          if (dataAttr === params) {
            buttons.forEach((buttonRemoveClass) =>
              buttonRemoveClass.classList.remove('active-filter')
            );

            button.classList.add('active-filter');
          }
        });
      }
    } else {
      $('.aera-all-resources__filters-wrapper span').first().addClass('active-filter');
    }
  }

  function popupVideo() {
    $('.aera--video-popup').magnificPopup({
      mainClass: 'mfp-fade',
      disableOn: 300,
      type: 'iframe',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: true,
      callbacks: {
        open: function () {
          $('html').addClass('overflow-full');
          $('.aera-header').animate({ opacity: '0' }, 200);
          $('.mfp-close').html('').text('Close');
        },
        close: function () {
          $('html').removeClass('overflow-full');
          $('.aera-header').animate({ opacity: '1' }, 200);
        },
      },
    });
  }

  function ajaxContent(cpt) {
    $.ajax({
      type: 'POST',
      dataType: 'html',
      url: getresources.ajaxurl,
      data: {
        action: 'aera_jobs_ajax',
        cpt: cpt,
      },
      success: function (response) {
        $('.aera-all-resources__items').html(response);
        $('.aera-all-resources__item-wrapper').addClass('active-item');
        popupVideo();
      },
      error: function (jqXHR, textStatus) {
        console.log(textStatus);
      },
    });
  }

  $('.aera-all-resources__filters-wrapper span').on('click', function () {
    ajaxContent($(this).attr('data-cpt'));

    $('.aera-all-resources__filters-wrapper span').each(function () {
      $(this).removeClass('active-filter');
    });

    $(this).addClass('active-filter');
  });

  popupVideo();
})(jQuery, window, document);
