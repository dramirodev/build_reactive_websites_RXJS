import { interval } from 'rxjs';
import { tap, mapTo } from 'rxjs/operators';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';

import { config } from './config';
import { GameState } from './gameState';

// Additional imports go here

/*
ART:
player spaceship: https://opengameart.org/content/24x24-48x48-spaceships
aliens: https://opengameart.org/content/alien-spaceship-invasion
explosion: https://opengameart.org/content/simple-explosion-bleeds-game-art
*/

// Rx backbone goes here
