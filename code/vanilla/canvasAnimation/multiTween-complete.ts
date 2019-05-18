import { interval } from 'rxjs';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';
import { map, takeWhile } from 'rxjs/operators';

let redSquare = document.querySelector('.red.box');
let blueSquare = document.querySelector('.blue.box');
let greenSquare = document.querySelector('.green.box');

function percentDone(durationSec) {
  return function ($obs) {
    let startTime = animationFrame.now();
    // let endTime = animationFrame.now() + (durationSec * 1000);
    // let durationMs = endTime - startTime;
    return $obs.pipe(
      map(() => (animationFrame.now() - startTime) / (durationSec * 1000))
    );
  };
}

function easingMap(easingFn) {
  return function ($obs) {
    return $obs.pipe(map(easingFn));
  };
}

function finalTween(easingFn, element, endPoint, duration) {
  let startPoint = element.style.left;
  let pixelsToMove = endPoint - startPoint;

  interval(1000 / 60, animationFrame)
  .pipe(
    percentDone(duration),
    takeWhile(percentDone => percentDone <= 1),
    easingMap(easingFn)
  )
  .subscribe((movePercent: number) => {
    element.style.left = startPoint + (pixelsToMove * movePercent) + 'px';
  });
}

// Easing Functions
let linear = p => p;
let quadraticIn = p => p * p;
let quadraticOut = p => p * (2 - p);

finalTween(linear, redSquare, 500, 5);
finalTween(quadraticIn, blueSquare, 500, 5);
finalTween(quadraticOut, greenSquare, 500, 5);
