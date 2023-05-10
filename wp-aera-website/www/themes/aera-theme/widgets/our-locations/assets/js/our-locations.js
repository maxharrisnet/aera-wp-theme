(function ($, window, document, undefined) {
  'use strict';

  function locationsAnimate() {
    const markerElements = document.querySelectorAll('.aera-our-locations__map-marker');
    const locationElements = document.querySelectorAll('.aera-our-locations__address');
    const mapElement = document.querySelector('.aera-our-locations__map');
    let tl = new TimelineLite();
    let isElementShow = false;

    if (markerElements.length && locationElements.length) {
      tl.set(markerElements, { autoAlpha: 0 });
      tl.set(locationElements, { autoAlpha: 0 });

      window.addEventListener('scroll', scrollHandler);
      scrollHandler();

      locationElements.forEach((location, index) => {
        location.addEventListener('mouseover', () => {
          if (markerElements[index] !== null) {
            moveUpMarker(markerElements[index]);
          }
        });
      });
    }

    function isAnyPartOfElementInViewport(element) {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;

      const vertInView = rect.top + 150 <= windowHeight && rect.top + rect.height >= 0;
      const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

      return vertInView && horInView;
    }

    function scrollHandler() {
      if (mapElement !== null && !isElementShow) {
        if (isAnyPartOfElementInViewport(mapElement)) {
          isElementShow = true;
          tl.staggerFromTo(
            markerElements,
            1.1,
            { autoAlpha: 0, y: '-20px' },
            { autoAlpha: 1, y: '0px', ease: 'Bounce.easeOut' },
            0.4,
            0
          );
          tl.staggerFromTo(
            locationElements,
            1.1,
            { autoAlpha: 0 },
            { autoAlpha: 1, ease: 'Power4.easeInOut' },
            0.4,
            0
          );
        }
      }
    }

    function moveUpMarker(markerEl) {
      new TimelineLite()
        .set(markerEl, { zIndex: 1 })
        .to(markerEl, 0.2, { y: '-20px', ease: 'Power4.easeOut' })
        .to(markerEl, 0.8, { y: '0px', ease: 'Bounce.easeOut' })
        .set(markerEl, { zIndex: 'auto' });
    }
  }

  locationsAnimate();
})(jQuery, window, document);
