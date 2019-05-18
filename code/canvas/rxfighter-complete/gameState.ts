import { fromEvent } from 'rxjs';
import { config } from './config';
import { randInt } from './util';

// Keep track of the state of all movement keys
let keyStatus = {};
fromEvent(document, 'keydown')
.subscribe((e: any) => {
  keyStatus[e.keyCode] = true;
});

fromEvent(document, 'keyup')
.subscribe((e: any) => {
  keyStatus[e.keyCode] = false;
});

export class GameState {
  stars: {
    x: number;
    y: number;
    dy: number;
    size: number;
  }[] = [];
  player = {
    x: config.canvas.height - (config.ship.height * 2),
    y: (config.canvas.width / 2) - (config.ship.width / 2),
    alive: true,
    lasers: [{
      x: config.canvas.width / 2,
      y: -1000
    }, {
      x: config.canvas.width / 2,
      y: -1000
    }, {
      x: config.canvas.width / 2,
      y: -1000
    }]
  };
  keyStatus: { [status: number]: boolean };
  enemy = {
    x: -1000,
    y: 0,
    dx: 0,
    dy: 0,
    alive: true,
    lasers: [{
      x: config.canvas.width / 2,
      y: 10000
    }, {
      x: config.canvas.width / 2,
      y: 10000
    }, {
      x: config.canvas.width / 2,
      y: 10000
    }]
  };
  explosions: {
    x: number;
    y: number;
    framesSince: number;
    type: string;
  }[] = [{
    x: -1000,
    y: -1000,
    framesSince: 1000,
    type: ''
  }, {
      x: -1000,
      y: -1000,
      framesSince: 1000,
      type: ''
    }, {
      x: -1000,
      y: -1000,
      framesSince: 1000,
      type: ''
    }];

  constructor() {
    for (let i = 0; i < 100; i++) {
      this.stars.push({
        x: randInt(0, config.canvas.width),
        y: randInt(0, config.canvas.height),
        dy: Math.random() * 10,
        size: randInt(-3, 1)
      });
    }

    this.keyStatus = keyStatus;
  }
}
