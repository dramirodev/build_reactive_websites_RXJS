import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameState } from './gameState';
import { config } from './config';
import { ctx } from './index';

let explosion = './img/explosion.png';
let explosionImg = document.createElement('img');
explosionImg.src = explosion;

function isColliding(laser, ship, shipType): boolean {
  return laser.x > ship.x &&
         laser.x < ship.x + config[shipType].width &&
         laser.y > ship.y &&
         laser.y < ship.y + config[shipType].height &&
         ship.alive;
}

export function checkCollision(obs: Observable<GameState>) {
  return obs
  .pipe(
    map(gameState => {
      gameState.explosions.forEach(e => {
        e.framesSince++;
      });
      gameState.player.lasers.forEach(l => {
        if (isColliding(l, gameState.enemy, 'enemy')) {
          let availableExplosion = gameState.explosions.find(e =>
            e.framesSince > config.explosion.frames * config.explosion.gameFramesPer
          );
          // Fill in code here
        }
      });
      gameState.enemy.lasers.forEach(l => {
        if (isColliding(l, gameState.player, 'ship')) {
          let availableExplosion = gameState.explosions.find(e =>
            e.framesSince > config.explosion.frames * config.explosion.gameFramesPer
          );
          // Fill in code here
        }
      });
      return gameState;
    })
  );
}
