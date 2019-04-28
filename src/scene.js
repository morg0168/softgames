import resources from './resources';
import TWEEN from '@tweenjs/tween.js';

export default class Scene extends PIXI.Container {
  constructor(el) {
    super();

    if (el !== 'menu') {
      const closeButton = new PIXI.Sprite(PIXI.Texture.fromFrame(resources.close));
      closeButton.anchor.set(0.5);
      closeButton.scale.set(0.1);
      closeButton.interactive = true;
      closeButton.buttonMode = true;
      closeButton.on('pointerdown', () => this.handleButtonClick('menu'));
      closeButton.x = app.screen.width - 40;
      closeButton.y = 40;
      this.addChild(closeButton);
    }
    this.cardsArr = [];
    switch (el) {
      case 'menu':
        this.menu();
        break;
      case 'cards':
        this.cards();
        break;
      case 'fire':
        ;
        this.fire();
        break;
      case 'sprites':
        this.sprites();
    }
  }

  menu() {
    const buttons = ['cards', 'fire', 'sprites'];
    buttons.map((el, i) => {
      let button = new PIXI.Sprite(PIXI.Texture.fromFrame(resources.button));
      button.anchor.set(0.5);
      button.scale.set(0.7);
      button.x = window.innerWidth / 2;
      button.y = window.innerHeight / 4 + window.innerHeight / 4 * i;
      button.interactive = true;
      button.buttonMode = true;
      button.on('pointerdown', () => this.handleButtonClick(el));

      let text = new PIXI.Text(el, new PIXI.TextStyle({
        fontSize: 30,
        fill: '#000000',
        fontWeight: 'bold',
        strokeThickness: 2
      }));
      text.anchor.set(0.5);

      button.addChild(text);
      this.addChild(button);
    });
  }

  cards() {
    const cards = [];
    this.cards = new PIXI.Container();
    this.addChild(this.cards);

    for (let i = 0, l = 144; i < l; i++) {
      let card = new PIXI.Sprite(new PIXI.Texture.fromFrame(resources.card));
      card.anchor.set(0.5);
      card.scale.set(0.4);
      card.x = app.screen.width / 4;
      card.y = app.screen.height/3 + (i *0.1);
      let text = new PIXI.Text(i, new PIXI.TextStyle({
        fontSize: 30,
        fontWeight: 'bold',
        fill: '#000000',
        strokeThickness: 2
      }));
      text.anchor.set(0.5);
      card.addChild(text);
      this.cardsArr.push(card);
      this.cards.addChild(card);
    }
    this.shuffle();

    const fps = new PIXI.Text('', new PIXI.TextStyle({
      fontSize: 30,
      fill: '#ffffff'
    }));
    fps.x = app.screen.width - 180;
    fps.y = 20;
    fps.text = app.ticker.FPS.toFixed();
    this.addChild(fps);
  }

  shuffle() {
      for (let i = 0, j = this.cardsArr.length -1; i < this.cardsArr.length; i++, j--) {
      var card = this.cardsArr[j];
      new TWEEN.Tween(card)
        .to({
          x: card.x + (app.screen.width/2)
        }, 2000)
        .delay(i* 1000)
        .start().onStart(() => {}).onComplete(() => {
          this.cards.addChild(this.cardsArr[j]);
        });
    }
  }

  fire() {}

  sprites() {}

  handleButtonClick(el) {
    this.parent.handleButtonClick(el);
  }
}
