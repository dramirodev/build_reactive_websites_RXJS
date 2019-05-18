// Imports
import { interval, fromEvent } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

// Elements
let startButton = document.querySelector('#start-button');
let stopButton = document.querySelector('#stop-button');
let resultsArea = document.querySelector<HTMLElement>('.output');
// Observables
let tenthSecond$ = interval(100);
let startClick$ = fromEvent(startButton, 'click');
let stopClick$ = fromEvent(stopButton, 'click');

startClick$.subscribe(() => {
  tenthSecond$
    .pipe(
      map(item => (item / 10)),
      takeUntil(stopClick$)
    )
    .subscribe(num => resultsArea.innerText = num + 's');
});
