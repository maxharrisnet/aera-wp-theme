(function ($, window, document, undefined) {
  'use strict';

  if (typeof pageCalculations !== 'function') {
    let winW,
      winH,
      pageCalculations,
      onEvent = window.addEventListener;

    pageCalculations = function (func) {
      winW = window.innerWidth;
      winH = window.innerHeight;

      if (!func) return;

      onEvent('load', func, true);
      onEvent('resize', func, true);
      onEvent('orientationchange', func, false);
    };

    pageCalculations(function () {
      pageCalculations();
    });
  }

  function adminBarPositionFix() {
    if ($('#wpadminbar').length) {
      $('#wpadminbar').css('position', 'fixed');
    }
  }

  $(window).on('load resize orientationchange', function () {
    adminBarPositionFix();
  });
})(jQuery, window, document);
