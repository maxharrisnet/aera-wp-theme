import BackgroundController from './BackgroundController';

const initBackground = () => {
  const container = document.querySelector('[data-background]');
  if (!container) {
    return;
  }
  if (container.dataset.backgroundMounted === 'true') {
    return;
  }
  window.aeraBackground = new BackgroundController(container);
};

const deferInit = () => {
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(initBackground, { timeout: 2000 });
  } else {
    setTimeout(initBackground, 200);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', deferInit, { once: true });
} else {
  deferInit();
}
