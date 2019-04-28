import * as PIXI from 'pixi.js';
import TWEEN from '@tweenjs/tween.js';
import Game from './game';
import resources from './resources';

class App extends PIXI.Application {
  constructor() {
    super();
    document.body.appendChild(this.view);

    //load resources
    Object.keys(resources).forEach(key => PIXI.loader.add(key, resources[key]));
    PIXI.loader.load(() => this.create());
    window.addEventListener('resize', this.handleResize());
  }

  create() {
      const game = new Game(this);
      app.stage.addChild(game);
      this.ticker.add(this.animate);
  }

  handleResize() {
    this.renderer.resize(Math.ceil(window.innerWidth * 1), Math.ceil(window.innerHeight * 1));
    this.view.style.width = `${window.innerWidth}px`;
    this.view.style.height = `${window.innerHeight}px`;
  }

  animate() {
    TWEEN.update(app.ticker.lastTime);
  }
}

const app = new App();
window.app = app;
