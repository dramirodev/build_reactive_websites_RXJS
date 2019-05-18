import { Observable } from 'rxjs';
import { GameState } from './gameState';
import { config } from './config';
import { randInt } from './util';
import { ctx } from './index';
import { map } from 'rxjs/operators';

export function updateStars(gameState$: Observable<GameState>) {
  return gameState$
  .pipe(
    map(state => {
      state.stars.forEach(star => {
        star.y += star.dy;
        if (star.y > config.canvas.height) {
          star.x = randInt(0, config.canvas.width);
          star.y = 0;
        }
      });
      return state;
    })
  );
}

export function renderStars(state: GameState) {
  ctx.fillStyle = '#fff';
  state.stars.forEach(star => {
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });
}
