import { map } from 'rxjs/operators';
import { GameState } from './gameState';
import { ctx } from './index';
import { config } from './config';

export let resetGame = obs => {
  return obs
  .pipe(
    map((gameState: GameState) => {
      if (!gameState.player.alive && gameState.keyStatus[config.controls.restart]) {
        return new GameState();
      }
      return gameState;
    })
  );
};

export let renderGameOver = (gameState: GameState) => {
  if (gameState.player.alive) { return; }
  let fontHeight = 48;
  ctx.font = '48px serif';
  let message = '☠ Game Over ☠';
  let textSize = ctx.measureText(message);
  ctx.fillText(message, (config.canvas.width / 2) - (textSize.width / 2), (config.canvas.height / 2) - (fontHeight / 2));

  message = 'Press r to restart';
  ctx.font = '24px serif';
  textSize = ctx.measureText(message);
  ctx.fillText(message, (config.canvas.width / 2) - (textSize.width / 2), (config.canvas.height / 2) + fontHeight);
};
