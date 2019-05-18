import { Observable } from 'rxjs';
import { GameState } from './gameState';
import { map } from 'rxjs/operators';

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function triggerEvery(
  mapper,
  timeInterval: () => number,
  condition?: (gameState$: GameState) => boolean
) {
  let nextValidTrigger;
  return function (obs$: Observable<GameState>) {
    return obs$.pipe(map((gameState: GameState): GameState => {
      if (condition && !condition(gameState)) {
        return gameState;
      }
      if (nextValidTrigger > performance.now()) {
        return gameState;
      }
      nextValidTrigger = performance.now() + timeInterval();
      return mapper(gameState);
    }));
  };
}
