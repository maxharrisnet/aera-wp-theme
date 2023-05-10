(function ($, window, document, undefined) {
  'use strict';

  if (window.matchMedia('(min-width: 768px)').matches) {
    const imagesWrapper = document.querySelectorAll(
      '.technology-section__left-item__wrapper'
    );
    const videosWrapper = document.querySelectorAll(
      '.technology-section__left-item__content-video'
    );
    const contentBlock = document.querySelectorAll(
      '.technology-section__right-item'
    );
    let firstBlockAnimation = true;
    let secondBlockAnimation = true;
    let thirdBlockAnimation = true;
    let fourthBlockAnimation = true;

    const tl = new TimelineLite();
    TweenLite.set(videosWrapper, { opacity: 0 });

    if (imagesWrapper.length && contentBlock.length) {
      imagesWrapper.forEach((item) => {
        item.classList.add('hide-item');
      });
      imagesWrapper[0].classList.remove('hide-item');

      contentBlock.forEach((item, i) => {
        window.addEventListener('scroll', function () {
          // Play Message Animation

          if (
            window.scrollY >
              contentBlock[0].getBoundingClientRect().top + 180 &&
            firstBlockAnimation === true
          ) {
            firstBlockAnimation = false;

            imagesWrapper[0].querySelector('video').muted = true;
            imagesWrapper[0].querySelector('video').play();

            tl.fromTo(
              videosWrapper[0],
              0.3,
              { opacity: 0 },
              { opacity: 1, ease: window.Power1.easeOut }
            );

            new TimelineLite().staggerFromTo(
              imagesWrapper[0].querySelectorAll(
                '.technology-section__left-item__content-text'
              ),
              0.3,
              { opacity: 0, y: 10, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, ease: window.Power3.easeOut },
              0.3,
              0.9
            );
          }

          if (
            window.scrollY > contentBlock[1].getBoundingClientRect().bottom &&
            secondBlockAnimation === true
          ) {
            secondBlockAnimation = false;

            imagesWrapper[1].querySelector('video').muted = true;
            imagesWrapper[1].querySelector('video').play();

            tl.fromTo(
              videosWrapper[1],
              0.3,
              { opacity: 0 },
              { opacity: 1, ease: window.Power1.easeOut }
            );

            new TimelineLite().staggerFromTo(
              imagesWrapper[1].querySelectorAll(
                '.technology-section__left-item__content-text'
              ),
              0.3,
              { opacity: 0, y: 10, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, ease: window.Power3.easeOut },
              0.3,
              0.9
            );
          }

          if (
            window.scrollY >
              contentBlock[2].getBoundingClientRect().bottom - 100 &&
            thirdBlockAnimation === true &&
            !imagesWrapper[2].classList.contains('hide-item')
          ) {
            thirdBlockAnimation = false;

            imagesWrapper[2].querySelector('video').muted = true;
            imagesWrapper[2].querySelector('video').play();

            tl.fromTo(
              videosWrapper[2],
              0.3,
              { opacity: 0 },
              { opacity: 1, ease: window.Power1.easeOut }
            );

            new TimelineLite().staggerFromTo(
              imagesWrapper[2].querySelectorAll(
                '.technology-section__left-item__content-text'
              ),
              0.3,
              { opacity: 0, y: 10, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, ease: window.Power3.easeOut },
              0.3,
              0.9
            );
          }

          if (
            window.scrollY >
              contentBlock[3].getBoundingClientRect().bottom - 100 &&
            fourthBlockAnimation === true &&
            !imagesWrapper[3].classList.contains('hide-item')
          ) {
            fourthBlockAnimation = false;

            imagesWrapper[3].querySelector('video').muted = true;
            imagesWrapper[3].querySelector('video').play();

            tl.fromTo(
              videosWrapper[3],
              0.3,
              { opacity: 0 },
              { opacity: 1, ease: window.Power1.easeOut }
            );

            new TimelineLite().staggerFromTo(
              imagesWrapper[3].querySelectorAll(
                '.technology-section__left-item__content-text'
              ),
              0.3,
              { opacity: 0, y: 10, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, ease: window.Power3.easeOut },
              0.3,
              0.9
            );
          }
          // Play Message Animation

          // Hide/Show Blocks
          if (item.offsetTop + 100 < window.scrollY) {
            if (imagesWrapper[i - 1]) {
              imagesWrapper[i - 1].classList.add('hide-item');
            }

            imagesWrapper[i].classList.remove('hide-item');
          } else {
            imagesWrapper[i].classList.add('hide-item');
          }
        });
      });
    }
  }

  if (window.matchMedia('(max-width: 767px)').matches) {
    const videos = document.querySelectorAll(
      '.technology-section__left-item video'
    );
    const blocksWrapper = document.querySelectorAll(
      '.technology-section__left-item__wrapper'
    );
    let firstBlockAnimation = true;
    let secondBlockAnimation = true;
    let thirdBlockAnimation = true;
    let fourthBlockAnimation = true;

    if (videos.length) {
      videos.forEach((item) => {
        item.muted = true;
        item.play();
      });
    }

    showMessage();

    function showMessage() {
      blocksWrapper.forEach((item) => {
        window.addEventListener('scroll', function () {
          if (
            window.scrollY >
              blocksWrapper[0].getBoundingClientRect().top + 150 &&
            firstBlockAnimation === true
          ) {
            firstBlockAnimation = false;

            new TimelineLite().staggerFromTo(
              blocksWrapper[0].querySelectorAll(
                '.technology-section__left-item__content-text'
              ),
              0.3,
              { opacity: 0, y: 10, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, ease: window.Power3.easeOut },
              0.3,
              0.9
            );
          }

          if (
            window.scrollY > blocksWrapper[1].getBoundingClientRect().bottom &&
            secondBlockAnimation === true
          ) {
            secondBlockAnimation = false;

            new TimelineLite().staggerFromTo(
              blocksWrapper[1].querySelectorAll(
                '.technology-section__left-item__content-text'
              ),
              0.3,
              { opacity: 0, y: 10, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, ease: window.Power3.easeOut },
              0.3,
              0.9
            );
          }

          if (
            window.scrollY >
              blocksWrapper[2].getBoundingClientRect().bottom + 100 &&
            thirdBlockAnimation === true
          ) {
            thirdBlockAnimation = false;

            new TimelineLite().staggerFromTo(
              blocksWrapper[2].querySelectorAll(
                '.technology-section__left-item__content-text'
              ),
              0.3,
              { opacity: 0, y: 10, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, ease: window.Power3.easeOut },
              0.3,
              0.9
            );
          }

          if (
            window.scrollY >
              blocksWrapper[3].getBoundingClientRect().bottom + 1000 &&
            fourthBlockAnimation === true
          ) {
            fourthBlockAnimation = false;

            new TimelineLite().staggerFromTo(
              blocksWrapper[3].querySelectorAll(
                '.technology-section__left-item__content-text'
              ),
              0.3,
              { opacity: 0, y: 10, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, ease: window.Power3.easeOut },
              0.3,
              0.9
            );
          }
        });
      });
    }
  }
})(jQuery, window, document);
