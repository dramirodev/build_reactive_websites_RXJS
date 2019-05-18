import { interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';

let box = document.querySelector('#box');

function rafTween(element, pixelsToMove, durationSec) {
  let startTime = animationFrame.now();
  let endTime = animationFrame.now() + (durationSec * 1000);
  let durationMs = endTime - startTime;
  let startPoint = element.style.left;

  interval(1000 / 60, animationFrame)
  .pipe(
    map(() => (animationFrame.now() - startTime) / durationMs), // (1)
    takeWhile(percentDone => percentDone <= 1) // (2)
  )
  .subscribe(percentDone => {
    element.style.left = startPoint + (pixelsToMove * percentDone) + 'px';
  });
}

// Move the box 500 pixels over five seconds
rafTween(box, 500, 5);
