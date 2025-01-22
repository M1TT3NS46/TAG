/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Targeted extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("nobody", "./Targeted/costumes/nobody.svg", {
        x: 97.75,
        y: 19.33437038146974,
      }),
      new Costume("player 1", "./Targeted/costumes/player 1.svg", {
        x: 97.75,
        y: 19.334370762939443,
      }),
      new Costume("player 2", "./Targeted/costumes/player 2.svg", {
        x: 101.5,
        y: 19.334375381469727,
      }),
    ];

    this.sounds = [new Sound("pop", "./Targeted/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start tagger tick" },
        this.whenIReceiveStartTaggerTick
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Player 2 wins" },
        this.whenIReceivePlayer2Wins
      ),
      new Trigger(Trigger.BROADCAST, { name: "tie" }, this.whenIReceiveTie),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Player 1 wins" },
        this.whenIReceivePlayer1Wins
      ),
    ];
  }

  *whenIReceiveStartTaggerTick() {
    this.visible = true;
    while (true) {
      if (this.toString(this.stage.vars.targeted) === "Player 1") {
        this.effects.ghost = 100;
        this.costume = "player 1";
        for (let i = 0; i < 10; i++) {
          this.effects.ghost -= 10;
          yield;
        }
        while (!(this.toString(this.stage.vars.targeted) === "Player 2")) {
          yield;
        }
      }
      if (this.toString(this.stage.vars.targeted) === "Player 2") {
        this.effects.ghost = 100;
        this.costume = "player 2";
        for (let i = 0; i < 10; i++) {
          this.effects.ghost -= 10;
          yield;
        }
        while (!(this.toString(this.stage.vars.targeted) === "Player 1")) {
          yield;
        }
      }
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    this.effects.ghost = 0;
    this.costume = "nobody";
  }

  *whenIReceivePlayer2Wins() {
    this.visible = true;
    this.stage.watchers.targeted.visible = false;
    /* TODO: Implement stop other scripts in sprite */ null;
    this.stage.watchers.timeLeft.visible = false;
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *whenIReceiveTie() {
    this.visible = true;
    this.stage.watchers.targeted.visible = false;
    this.stage.watchers.timeLeft.visible = false;
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *whenIReceivePlayer1Wins() {
    this.visible = true;
    this.stage.watchers.targeted.visible = false;
    /* TODO: Implement stop other scripts in sprite */ null;
    this.stage.watchers.timeLeft.visible = false;
    /* TODO: Implement stop other scripts in sprite */ null;
  }
}
