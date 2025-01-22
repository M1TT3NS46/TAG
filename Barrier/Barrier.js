/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Barrier extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Barrier/costumes/costume1.svg", {
        x: 51.5,
        y: 51.5,
      }),
    ];

    this.sounds = [new Sound("pop", "./Barrier/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start tagger tick" },
        this.whenIReceiveStartTaggerTick
      ),
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    this.goto(0, 0);
  }

  *whenIReceiveStartTaggerTick() {
    this.visible = false;
  }
}
