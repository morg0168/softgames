import resources from './resources';
import Scene from './scene';

export default class Game extends PIXI.Container {
  constructor(){
    super();

    this.background = new PIXI.Sprite(PIXI.Texture.fromFrame(resources.background));
    this.handleResize();
    this.scene = null;

    window.addEventListener('resize', () => this.handleResize());
      this.addChild(this.background);
      this.showMenu();
    }

  handleResize() {
    this.background.anchor.set(0.5);
    this.background.scale.set(Math.max(app.screen.width / this.background.width, app.screen.height / this.background.height) * this.background.scale.x);
    this.background.x = app.screen.width * 0.5;
    this.background.y = app.screen.height * 0.5;
  }

  showMenu() {
    this.handleButtonClick('menu');
  }

  handleButtonClick(el) {
    this.scene && this.scene.destroy();
    this.scene = new Scene(el);
    this.addChild(this.scene);
  }
}
