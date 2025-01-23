import {
  Project,
  Sprite,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Player1 from "./Player1/Player1.js";
import Player2 from "./Player2/Player2.js";
import Tagger from "./Tagger/Tagger.js";
import WhoWins from "./WhoWins/WhoWins.js";
import Thumbnail from "./Thumbnail/Thumbnail.js";
import Barrier from "./Barrier/Barrier.js";
import Targeted from "./Targeted/Targeted.js";
import TaggerName from "./TaggerName/TaggerName.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Player1: new Player1({
    x: 128.4118652350202,
    y: -80.03538819666119,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.DONT_ROTATE,
    costumeNumber: 1,
    size: 80,
    visible: true,
    layerOrder: 4,
  }),
  Player2: new Player2({
    x: 216.50022888491804,
    y: 144.49996903495048,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.DONT_ROTATE,
    costumeNumber: 1,
    size: 80,
    visible: true,
    layerOrder: 2,
  }),
  Tagger: new Tagger({
    x: 212.4109617316675,
    y: 139.55360534527324,
    direction: 39.58128436143037,
    rotationStyle: Sprite.RotationStyle.LEFT_RIGHT,
    costumeNumber: 1,
    size: 80,
    visible: true,
    layerOrder: 1,
  }),
  WhoWins: new WhoWins({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 8,
  }),
  Thumbnail: new Thumbnail({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 2,
    size: 100,
    visible: false,
    layerOrder: 7,
  }),
  Barrier: new Barrier({
    x: 0,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 70,
    visible: false,
    layerOrder: 3,
  }),
  Targeted: new Targeted({
    x: 0,
    y: 137.00086857110304,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 3,
    size: 100,
    visible: true,
    layerOrder: 5,
  }),
  TaggerName: new TaggerName({
    x: 212.4109617316675,
    y: 139.55360534527324,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 6,
  }),
};

const project = new Project(stage, sprites, {
  frameRate: 60, // Set to 60 to make your project run faster
});
export default project;
