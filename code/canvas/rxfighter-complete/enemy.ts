import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { randInt, triggerEvery } from './util';
import { GameState } from './gameState';
import { config } from './config';
import { ctx } from './index';

let enemyShip = './img/enemy.png';
let enemyImg = document.createElement('img');
enemyImg.src = enemyShip;

function updateEnemyState(gameState: GameState): GameState {
  // Enemy appears, moves down 1/3 of the map, then turns
  // Spawn a new enemy ship if needed
  if (gameState.enemy.x <= -config.enemy.width ||
    gameState.enemy.x > config.canvas.width ||
    !gameState.enemy.alive
  ) {
    let xStart = randInt(
      config.enemy.width,
      config.canvas.width - config.enemy.width
    );
    gameState.enemy.alive = true;
    gameState.enemy.y = -config.enemy.height;
    gameState.enemy.x = xStart;
    gameState.enemy.dy = config.enemy.speed;
    gameState.enemy.dx = 0;
  }

  // Once 1/3 point is reached, turn to a side
  if (gameState.enemy.y >= config.canvas.height / 3 &&
    gameState.enemy.dx === 0
  ) {
    let leftOrRight = Math.random() > 0.5;
    gameState.enemy.dy = 0;
    gameState.enemy.dx = config.enemy.speed * (leftOrRight ? 1 : -1);
  }

  gameState.enemy.x += gameState.enemy.dx;
  gameState.enemy.y += gameState.enemy.dy;
  return gameState;
}

function updateEnemyLasers(gameState: GameState): GameState {
  gameState.enemy.lasers
    .forEach(l => l.y += config.laser.speed);
  return gameState;
}

let nextEnemyFire = () => randInt(500, 1500);
function fireEnemyLaser(gameState: GameState): GameState {
  let availableLaser = gameState.enemy.lasers.find(l =>
    l.y > config.canvas.height + config.laser.height
  );
  if (!availableLaser) { return gameState; }
  let offset = (config.enemy.width / 2) - (config.laser.width / 2);
  availableLaser.x = gameState.enemy.x + offset;
  availableLaser.y = gameState.enemy.y + config.enemy.height;
  return gameState;
}

export function updateEnemies(obs: Observable<GameState>) {
  return obs
  .pipe(
    map(updateEnemyState),
    map(updateEnemyLasers),
    triggerEvery(fireEnemyLaser, nextEnemyFire)
  );
}

export function renderEnemies(state: GameState) {
  ctx.drawImage(enemyImg, state.enemy.x, state.enemy.y);
}
