(function ($, window, document, undefined) {
  'use strict';

  document.addEventListener('DOMContentLoaded', hubspotSendForm, false);

  function hubspotSendForm() {
    document.addEventListener(
      'click',
      function (e) {
        if (hasClass(e.target, 'hs-button')) {
          setTimeout(() => {
            const formErrorsMainMessage =
              document.querySelectorAll('.hs_error_rollup');
            const formErrorsMessage =
              document.querySelectorAll('.hs-error-msgs');

            const deletedMessage = document.querySelectorAll(
              '.aera-hubspot-form__text'
            );
            const deletedBanner = document.querySelectorAll(
              '.aera-hubspot-form__banner'
            );

            if (
              deletedBanner.length &&
              deletedMessage.length &&
              !formErrorsMainMessage.length &&
              !formErrorsMessage.length
            ) {
              setTimeout(() => {
                deletedMessage.forEach((message) => message.remove());
                deletedBanner.forEach((banner) => banner.remove());

                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }, 200);
            }
          }, 300);
        }
      },
      false
    );

    function hasClass(elem, className) {
      return elem.className.split(' ').indexOf(className) > -1;
    }
  }
})(jQuery, window, document);
