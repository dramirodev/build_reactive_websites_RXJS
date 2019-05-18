import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

let myObs$ = new Observable(o => {
  console.log('Creation Function');
  setInterval(() => o.next('hello ' +  Math.random()), 1000);
})
.pipe(
  share()
);

myObs$.subscribe(x => console.log('streamA', x));

setTimeout(() => {
  myObs$.subscribe(x => console.log('streamB', x));
}, 500);
