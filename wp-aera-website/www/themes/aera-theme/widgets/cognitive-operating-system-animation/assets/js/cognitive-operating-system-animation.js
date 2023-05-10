function cosAnimation() {
  const elWrapper = document.querySelector('.aera-cos-animation');
  const elBackground = document.querySelector(
    '.aera-cos-animation__wrapper-bg'
  );
  const elComputer = document.querySelector(
    '.aera-cos-animation__wrapper-first'
  );
  const elPhone = document.querySelector('.aera-cos-animation__wrapper-second');
  const elTablet = document.querySelector('.aera-cos-animation__wrapper-third');
  const elKeyboard = document.querySelector(
    '.aera-cos-animation__wrapper-fourth'
  );
  const elPen = document.querySelector('.aera-cos-animation__wrapper-fifth');

  let tl = new TimelineLite();
  let isVisible = false;

  tl.set(elBackground, { autoAlpha: 0 })
    .set(elComputer, { autoAlpha: 0 })
    .set(elPhone, { autoAlpha: 0 })
    .set(elTablet, { autoAlpha: 0 })
    .set(elKeyboard, { autoAlpha: 0 })
    .set(elPen, { autoAlpha: 0 });

  const animate = () => {
    tl.fromTo(
      elBackground,
      0.8,
      { autoAlpha: 0 },
      { autoAlpha: 1, ease: 'Power3.easeInOut' },
      0
    )
      .fromTo(
        elBackground,
        1,
        { y: '10%' },
        { y: '0%', ease: 'Power3.easeOut' },
        0
      )
      .fromTo(
        elComputer,
        0.8,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: 'Power3.easeInOut' },
        0
      )
      .fromTo(
        elComputer,
        1,
        { y: '10%' },
        { y: '0%', ease: 'Power3.easeOut' },
        0
      )
      .fromTo(
        elKeyboard,
        0.8,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: 'Power3.easeInOut' },
        0.5
      )
      .fromTo(
        elKeyboard,
        1,
        { y: '30px' },
        { y: '0px', ease: 'Power3.easeOut' },
        0.7
      )
      .fromTo(
        elPhone,
        0.8,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: 'Power3.easeInOut' },
        1
      )
      .fromTo(
        elPhone,
        1,
        { x: '-30px' },
        { x: '0px', ease: 'Power3.easeOut' },
        1
      )
      .fromTo(
        elTablet,
        0.8,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: 'Power3.easeInOut' },
        1.5
      )
      .fromTo(
        elTablet,
        1,
        { x: '30px' },
        { x: '0px', ease: 'Power3.easeOut' },
        1.5
      )
      .fromTo(
        elPen,
        0.8,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: 'Power3.easeInOut' },
        1.9
      )
      .fromTo(
        elPen,
        1,
        { x: '30px' },
        { x: '0px', ease: 'Power3.easeOut' },
        1.9
      );
  };

  const isScrolledIntoView = (el) => {
    let rect = el.getBoundingClientRect();
    let elemTop = rect.top;
    let elemBottom = rect.bottom;

    let isVisible = elemTop >= 0 && elemBottom - 420 <= window.innerHeight;

    return isVisible;
  };

  window.addEventListener('DOMContentLoaded', () => {
    if (isVisible !== true) {
      isVisible = isScrolledIntoView(elWrapper);

      if (isVisible) {
        animate();
        isVisible = true;
      }
    }
  });

  window.addEventListener('scroll', () => {
    if (isVisible !== true) {
      isVisible = isScrolledIntoView(elWrapper);

      if (isVisible) {
        animate();
        isVisible = true;
      }
    }
  });
}

cosAnimation();
