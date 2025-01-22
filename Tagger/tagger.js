/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Tagger extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("tagger", "./Tagger/costumes/tagger.svg", {
        x: 11.291529999999995,
        y: 11.291515000000004,
      }),
      new Costume("trail", "./Tagger/costumes/trail.svg", {
        x: 4.194629999999989,
        y: 4.194629999999989,
      }),
    ];

    this.sounds = [
      new Sound("countdown", "./Tagger/sounds/countdown.wav"),
      new Sound("player 1 targeted", "./Tagger/sounds/player 1 targeted.wav"),
      new Sound("player 2 targeted", "./Tagger/sounds/player 2 targeted.wav"),
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start tagger tick" },
        this.whenIReceiveStartTaggerTick
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start tagger tick" },
        this.whenIReceiveStartTaggerTick2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start tagger tick" },
        this.whenIReceiveStartTaggerTick3
      ),
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
      new Trigger(Trigger.CLONE_START, this.startAsClone),
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    this.stage.vars.timeLeft = 200;
    this.costume = "tagger";
    this.size = 80;
    this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
    yield* this.playSoundUntilDone("countdown");
    this.broadcast("Start tagger tick");
  }

  *whenIReceiveStartTaggerTick() {
    while (true) {
      yield* this.targetSystem();
      yield;
    }
  }

  *whenIReceiveStartTaggerTick2() {
    while (true) {
      if (
        this.compare(
          Math.hypot(
            this.sprites["Player1"].x - this.x,
            this.sprites["Player1"].y - this.y
          ),
          Math.hypot(
            this.sprites["Player2"].x - this.x,
            this.sprites["Player2"].y - this.y
          )
        ) < 0
      ) {
        yield* this.startSound("player 1 targeted");
        while (
          !(
            this.compare(
              Math.hypot(
                this.sprites["Player2"].x - this.x,
                this.sprites["Player2"].y - this.y
              ),
              Math.hypot(
                this.sprites["Player1"].x - this.x,
                this.sprites["Player1"].y - this.y
              )
            ) < 0
          )
        ) {
          yield;
        }
      }
      if (
        this.compare(
          Math.hypot(
            this.sprites["Player2"].x - this.x,
            this.sprites["Player2"].y - this.y
          ),
          Math.hypot(
            this.sprites["Player1"].x - this.x,
            this.sprites["Player1"].y - this.y
          )
        ) < 0
      ) {
        yield* this.startSound("player 2 targeted");
        while (
          !(
            this.compare(
              Math.hypot(
                this.sprites["Player1"].x - this.x,
                this.sprites["Player1"].y - this.y
              ),
              Math.hypot(
                this.sprites["Player2"].x - this.x,
                this.sprites["Player2"].y - this.y
              )
            ) < 0
          )
        ) {
          yield;
        }
      }
      yield;
    }
  }

  *whenIReceiveStartTaggerTick3() {
    while (true) {
      yield* this.wait(1);
      this.stage.vars.timeLeft--;
      if (
        this.toNumber(this.stage.vars.timeLeft) === 0 ||
        this.compare(this.stage.vars.timeLeft, 0) < 0
      ) {
        this.stage.vars.timeLeft = 0;
        this.broadcast("tie");
      }
      yield;
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

  *targetSystem() {
    if (
      this.compare(
        Math.hypot(
          this.sprites["Player1"].x - this.x,
          this.sprites["Player1"].y - this.y
        ),
        Math.hypot(
          this.sprites["Player2"].x - this.x,
          this.sprites["Player2"].y - this.y
        )
      ) < 0
    ) {
      yield* this.wait(0.01);
      while (
        !(
          this.compare(
            Math.hypot(
              this.sprites["Player2"].x - this.x,
              this.sprites["Player2"].y - this.y
            ),
            Math.hypot(
              this.sprites["Player1"].x - this.x,
              this.sprites["Player1"].y - this.y
            )
          ) < 0
        )
      ) {
        this.direction = this.radToScratch(
          Math.atan2(
            this.sprites["Player1"].y - this.y,
            this.sprites["Player1"].x - this.x
          )
        );
        this.stage.vars.targeted = "Player 1";
        this.move(11.5);
        yield;
      }
    }
    if (
      this.compare(
        Math.hypot(
          this.sprites["Player2"].x - this.x,
          this.sprites["Player2"].y - this.y
        ),
        Math.hypot(
          this.sprites["Player1"].x - this.x,
          this.sprites["Player1"].y - this.y
        )
      ) < 0
    ) {
      yield* this.wait(0.01);
      while (
        !(
          this.compare(
            Math.hypot(
              this.sprites["Player1"].x - this.x,
              this.sprites["Player1"].y - this.y
            ),
            Math.hypot(
              this.sprites["Player2"].x - this.x,
              this.sprites["Player2"].y - this.y
            )
          ) < 0
        )
      ) {
        this.direction = this.radToScratch(
          Math.atan2(
            this.sprites["Player2"].y - this.y,
            this.sprites["Player2"].x - this.x
          )
        );
        this.stage.vars.targeted = "Player 2";
        this.move(11.5);
        yield;
      }
    }
    this.createClone();
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
}
