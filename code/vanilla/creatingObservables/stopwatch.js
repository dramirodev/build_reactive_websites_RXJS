import { fromEvent, interval } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
// let tenthSecond$ = new Observable(observer => {
//     let counter = 0;
//     observer.next(0);
//     let interv = setInterval(()=>{
//         counter++;
//         observer.next(counter);
//     }, 100);
//     return function unsubscribe() {clearInterval(interv)}
// });
// Elements
let startButton = document.querySelector('#start-button');
let stopButton = document.querySelector('#stop-button');
let resultsArea = document.querySelector('.output');
// Observables
let tenthSeconds$ = interval(100);
let startClick$ = fromEvent(startButton, 'click');
let stopClick$ = fromEvent(stopButton, 'click');
startClick$.subscribe(() => {
    tenthSeconds$
        .pipe(map(num => num / 10), takeUntil(stopClick$))
        .subscribe(num => resultsArea.innerText = num + 's');
});
