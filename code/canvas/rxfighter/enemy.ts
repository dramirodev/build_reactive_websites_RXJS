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

}
