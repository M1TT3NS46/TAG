/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Thumbnail extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Thumbnail/costumes/costume1.svg", {
        x: 0,
        y: 0,
      }),
      new Costume("costume", "./Thumbnail/costumes/costume.svg", {
        x: 243.10834000000003,
        y: 179.050995,
      }),
    ];

    this.sounds = [new Sound("pop", "./Thumbnail/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Player 1 wins" },
        this.whenIReceivePlayer1Wins
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Player 2 wins" },
        this.whenIReceivePlayer2Wins
      ),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    this.moveAhead();
    this.effects.ghost = 100;
  }

  *whenIReceivePlayer1Wins() {
    this.visible = false;
  }

  *whenIReceivePlayer2Wins() {
    this.visible = false;
  }
}
