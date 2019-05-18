import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

let stringAppendOperator = string => { // (1)
  return obs$ => { // (2)
    return obs$
    .pipe(map(val => val + string));
  };
};

let myObservable$ = new Observable(o => { // (3)
  o.next('hello');
  o.complete();
});

myObservable$.pipe(
  stringAppendOperator(' world!')
)
.subscribe(next => {
  console.log(next); // (4)
});
