import FpsStats from 'stats.js';
import RenderInfo from './stats';

export default class StatScene {

  constructor(statsEl, WebglScene) {
    this.WebglScene = WebglScene;

    this.fpsStats = new FpsStats();
    this.fpsStats.showPanel(0);
    this.fpsStats.dom.style.position = 'fixed';
    this.fpsStats.dom.style.top = `${((window.innerHeight / 2) - 108)}px`;
    statsEl.appendChild(this.fpsStats.dom);

    this.rendererInfo = new RenderInfo();
    this.rendererInfo.domElement.style.position = 'fixed';
    this.rendererInfo.domElement.style.left = '0px';
    this.rendererInfo.domElement.style.top = `${((window.innerHeight / 2) - 60)}px`;
    this.rendererInfo.domElement.style.width = '120px';
    statsEl.appendChild(this.rendererInfo.domElement);

    this.showStats();
  }

  showStats = () => {
    this.fpsStats.begin();
    this.fpsStats.end();

    this.rendererInfo.update(this.WebglScene.renderer);

    requestAnimationFrame(this.showStats);
  }
}
