import { interval } from 'rxjs';
import { take, map, delay} from 'rxjs/operators';

interval(1000)
  .pipe(
    take(5),
    map(val => val * 5),
    delay(500)
  )
  .subscribe(console.log);
