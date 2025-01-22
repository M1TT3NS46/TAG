/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("player", "./Player2/costumes/player.svg", {
        x: 11.291529999999995,
        y: 33.96926358764648,
      }),
      new Costume("trail", "./Player2/costumes/trail.svg", {
        x: 4.194629999999989,
        y: 4.194629999999989,
      }),
    ];

    this.sounds = [new Sound("Meow", "./Player2/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
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

    this.vars.xVel = 14.999999999986358;
    this.vars.yVel = 14.99999977647576;
  }

  *whenGreenFlagClicked() {
    this.goto(135, 0);
    this.costume = "player";
    this.vars.xVel = 0;
    this.vars.yVel = 0;
    while (true) {
      yield* this.playerMovementSpeedFriction(15, 0.5);
      if (this.touching(this.sprites["Tagger"].andClones())) {
        this.broadcast("Player 1 wins");
      }
      this.createClone();
      yield;
    }
  }

  *startAsClone() {
    this.effects.ghost = 0;
    this.costume = "trail";
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 10;
      yield;
    }
    this.deleteThisClone();
  }

  *moveX(x) {
    this.x += this.toNumber(x);
    if (
      this.touching(this.sprites["Barrier"].andClones()) ||
      this.touching("edge")
    ) {
      this.x += 0 - this.toNumber(x);
    }
  }

  *moveY(y) {
    this.y += this.toNumber(y);
    if (
      this.touching(this.sprites["Barrier"].andClones()) ||
      this.touching("edge")
    ) {
      this.y += 0 - this.toNumber(y);
    }
  }

  *whenIReceivePlayer1Wins() {
    this.visible = true;
    this.stage.watchers.targeted.visible = false;
    this.stage.watchers.timeLeft.visible = false;
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *whenIReceivePlayer2Wins() {
    this.visible = true;
    this.stage.watchers.targeted.visible = false;
    this.stage.watchers.timeLeft.visible = false;
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *whenIReceiveTie() {
    this.visible = true;
    this.stage.watchers.targeted.visible = false;
    this.stage.watchers.timeLeft.visible = false;
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *playerMovementSpeedFriction(speed, friction) {
    this.warp(this.moveX)(this.vars.xVel);
    this.warp(this.moveY)(this.vars.yVel);
    this.vars.xVel +=
      this.toNumber(speed) *
      (this.toNumber(this.keyPressed("right arrow")) -
        this.toNumber(this.keyPressed("left arrow")));
    this.vars.yVel +=
      this.toNumber(speed) *
      (this.toNumber(this.keyPressed("up arrow")) -
        this.toNumber(this.keyPressed("down arrow")));
    this.vars.xVel = this.toNumber(friction) * this.toNumber(this.vars.xVel);
    this.vars.yVel = this.toNumber(friction) * this.toNumber(this.vars.yVel);
  }
}
