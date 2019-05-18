import { GameState } from './gameState';
import { config } from './config';
import { ctx } from './index';

export function renderLasers(state: GameState) {
  state.player.lasers
    .filter(l => l.y + config.laser.height > 0)
    .forEach(laser => {
      ctx.fillStyle = '#6f4';
      ctx.fillRect(laser.x, laser.y, config.laser.width, config.laser.height);
    });
  state.enemy.lasers
    .filter(l => l.y + config.laser.height > 0)
    .forEach(laser => {
      ctx.fillStyle = '#f64';
      ctx.fillRect(laser.x, laser.y, config.laser.width, config.laser.height);
    });
}
