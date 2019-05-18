import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

let box = document.querySelector('#box');

function simpleTween(element, endPoint, durationSec) {
  // Convert duration to 60 frames per second
  let durationInFrames = 60 * durationSec;
  let distancePerStep = endPoint / durationInFrames;

  // 60 frames per second
  interval(1000 / 60)
  .pipe(
    map(n => n * distancePerStep),
    take(durationInFrames)
  )
  .subscribe((location) => {
    element.style.left = location + 'px';
  });
}

// Move the box 1000 pixels over five seconds
simpleTween(box, 500, 5);
