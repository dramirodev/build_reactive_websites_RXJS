import { Observable } from 'rxjs';
import { GameState } from './gameState';
import { map } from 'rxjs/operators';

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function triggerEvery() {}
