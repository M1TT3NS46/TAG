/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backround", "./Stage/costumes/backround.svg", {
        x: 241.16226,
        y: 209.56350708007812,
      }),
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.timeLeft = 200;
    this.vars.targeted = "Player 2";

    this.watchers.timeLeft = new Watcher({
      label: "time left",
      style: "normal",
      visible: false,
      value: () => this.vars.timeLeft,
      x: 417,
      y: 180,
    });
    this.watchers.targeted = new Watcher({
      label: "Targeted",
      style: "normal",
      visible: false,
      value: () => this.vars.targeted,
      x: 422,
      y: 180,
    });
  }
}
