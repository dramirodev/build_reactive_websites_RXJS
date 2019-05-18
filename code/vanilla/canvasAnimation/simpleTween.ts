import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';

let box = document.querySelector('#box');

function simpleTween(element, endPoint, durationSec) {
}

// Move the box 1000 pixels over five seconds
simpleTween(box, 500, 5);
