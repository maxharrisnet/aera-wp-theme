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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBackground, { once: true });
} else {
  initBackground();
}
