export let config = {
  canvas: {
    width: 960,
    height: 600
  },
  ship: {
    shootInterval: 500,
    height: 48,
    width: 48,
    speed: 7
  },
  enemy: {
    height: 85,
    width: 118,
    speed: 3
  },
  laser: {
    height: 15,
    width: 4,
    speed: 6
  },
  explosion: {
    height: 190,
    width: 196,
    frames: 13,
    gameFramesPer: 3
  },
  controls: {
    left: 37,
    right: 39,
    fireLaser: 32,
    restart: 82
  },
  friction: 0.02
};
