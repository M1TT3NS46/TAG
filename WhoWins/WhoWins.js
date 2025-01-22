/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class WhoWins extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Player 1", "./WhoWins/costumes/Player 1.svg", {
        x: 152.257395,
        y: 54.694105321769726,
      }),
      new Costume("Player 2", "./WhoWins/costumes/Player 2.svg", {
        x: 152.25739390218752,
        y: 54.694107090309174,
      }),
      new Costume("tie", "./WhoWins/costumes/tie.svg", {
        x: 96.66639108781283,
        y: 91.2230890580238,
      }),
    ];

    this.sounds = [
      new Sound("death", "./WhoWins/sounds/death.wav"),
      new Sound("tie", "./WhoWins/sounds/tie.wav"),
    ];

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
      new Trigger(Trigger.BROADCAST, { name: "tie" }, this.whenIReceiveTie),
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.targeted = "";
    this.visible = false;
  }

  *whenIReceivePlayer1Wins() {
    this.visible = true;
    this.costume = "Player 1";
    this.moveAhead();
    this.effects.ghost = 100;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost -= 10;
      yield;
    }
    this.goto(0, 0);
    this.stage.watchers.targeted.visible = false;
    this.stage.watchers.timeLeft.visible = false;
    yield* this.playSoundUntilDone("death");
    /* TODO: Implement stop all */ null;
  }

  *whenIReceivePlayer2Wins() {
    this.visible = true;
    this.costume = "Player 2";
    this.moveAhead();
    this.effects.ghost = 100;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost -= 10;
      yield;
    }
    this.goto(0, 0);
    this.stage.watchers.targeted.visible = false;
    this.stage.watchers.timeLeft.visible = false;
    yield* this.playSoundUntilDone("death");
    /* TODO: Implement stop all */ null;
  }

  *whenIReceiveTie() {
    this.visible = true;
    this.costume = "tie";
    this.moveAhead();
    this.effects.ghost = 100;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost -= 10;
      yield;
    }
    this.goto(0, 0);
    this.stage.watchers.targeted.visible = false;
    this.stage.watchers.timeLeft.visible = false;
    yield* this.playSoundUntilDone("tie");
    /* TODO: Implement stop all */ null;
  }
}
