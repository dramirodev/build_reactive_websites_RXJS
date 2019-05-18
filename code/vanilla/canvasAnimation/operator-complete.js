import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
let stringAppendOperator = string => {
    return obs$ => {
        return obs$
            .pipe(map(val => val + string));
    };
};
let myObservable$ = new Observable(o => {
    o.next('hello');
    o.complete();
});
myObservable$.pipe(stringAppendOperator(' world!'))
    .subscribe(next => {
    console.log(next); // (4)
});
