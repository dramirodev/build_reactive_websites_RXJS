import { interval } from 'rxjs';
import { take, map, pairwise } from 'rxjs/operators';

interval(1000 / 60)
.pipe(
  take(60),
  map(() => performance.now()),
  pairwise(),
  map(lastTimestamps => lastTimestamps[1] - lastTimestamps[0]),
  map(msPerFrame => msPerFrame.toLocaleString())
)
.subscribe(msPerFrame =>
  console.log(`Last frame took ${msPerFrame}ms to run, ideally 17`)
);
