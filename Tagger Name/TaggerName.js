/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class TaggerName extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./TaggerName/costumes/costume1.svg", {
        x: 20.277225000000016,
        y: 37.57476,
      }),
    ];

    this.sounds = [new Sound("pop", "./TaggerName/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *whenGreenFlagClicked() {
    while (true) {
      yield* this.makeScriptRunFaster();
      yield;
    }
  }

  *makeScriptRunFaster() {
    this.goto(this.sprites["Tagger"].x, this.sprites["Tagger"].y);
  }
}
