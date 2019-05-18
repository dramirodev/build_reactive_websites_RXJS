import { interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';

let box = document.querySelector('#box');

function rafTween(element, endPoint, durationSec) {
}

// Move the box 1000 pixels over five seconds
rafTween(box, 500, 5);
