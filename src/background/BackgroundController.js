import WebglScene from './WebglScene';

const SUPPORTED_PATHS = new Set([
  '/',
  '/company',
  '/technology',
  '/about-us',
  '/resources',
  '/careers',
  '/webinars',
  '/aera-decision-cloud',
  '/cognitive-automation',
  '/team',
  '/timeline-milestone',
  '/decision-cloud',
  '/decision-data-model-new',
  '/aera-cortex-new',
  '/modeling',
  '/decision-engagement',
  '/modeling-new',
  '/decision-engagement-new',
  '/aera-developer-new',
  '/test-drive',
  '/decision-cloud-old',
  '/decision-intelligence-faq',
  '/events',
  '/community',
]);

export default class BackgroundController {
  constructor(container) {
    this.container = container;
    if (!this.container || this.container.dataset.backgroundMounted === 'true') {
      return;
    }

    this.container.dataset.backgroundMounted = 'true';

    this.WebglScene = null;
    this.innerWidth = window.innerWidth;
    this.isVisibleRoute = this.isURLMatch(window.location.pathname || '/');

    this.onScroll = this.onScroll.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onResize = this.onResize.bind(this);
    this.setup = this.setup.bind(this);

    if (this.isVisibleRoute) {
      this.setup();
    } else {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(this.setup, { timeout: 3000 });
      }
      this.idleTimeout = window.setTimeout(this.setup, 3000);
    }
  }

  setup() {
    if (this.WebglScene) {
      return;
    }

    this.WebglScene = new WebglScene(this.container);

    if (this.isVisibleRoute) {
      this.WebglScene.showHelix();
    }

    this.setCanvasHeight();

    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    window.addEventListener('resize', this.onResize);
  }

  destroy() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('resize', this.onResize);

    if (this.WebglScene) {
      this.WebglScene.hideHelix();
    }
    this.container.dataset.backgroundMounted = 'false';
  }

  isURLMatch(path) {
    if (typeof document !== 'undefined' && document.body.classList.contains('is404')) {
      return true;
    }
    return SUPPORTED_PATHS.has(path);
  }

  onMouseMove(event) {
    if (!this.WebglScene) {
      return;
    }
    const moveMiddleX = event.pageX - (window.innerWidth / 2);
    const moveMiddleY = event.screenY - (window.innerHeight / 2);
    this.WebglScene.updateMouseMove(moveMiddleX, moveMiddleY);
  }

  onScroll() {
    if (this.WebglScene) {
      this.WebglScene.scrollY = window.scrollY;
    }
  }

  onResize() {
    const currentInnerWidth = window.innerWidth;
    const isTabletUp = window.matchMedia('(min-width: 767px)').matches;

    if ((this.innerWidth !== currentInnerWidth) || isTabletUp) {
      this.setCanvasHeight();
      if (this.WebglScene) {
        this.WebglScene.resizeCanvas();
      }
      this.innerWidth = currentInnerWidth;
    }
  }

  setCanvasHeight() {
    if (window.matchMedia('(min-width: 767px)').matches) {
      this.container.style.height = '';
      return;
    }
    this.container.style.height = `${window.innerHeight}px`;
  }
}
