import { config } from './config';
import { ctx } from './index';
import { Observable } from 'rxjs';
import { GameState } from './gameState';
import { triggerEvery } from './util';
import { map } from 'rxjs/operators';

let playerAvatar = './img/ship.png';
let playerImg = document.createElement('img');
playerImg.src = playerAvatar;
