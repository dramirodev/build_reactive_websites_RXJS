import { fromEvent } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

let draggable = <HTMLElement>document.querySelector('#draggable');

let mouseDown$ = fromEvent<MouseEvent>(draggable, 'mousedown');
let mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
let mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');

mouseDown$.subscribe(() => {
  mouseMove$
  .pipe(
    map(event => {
      event.preventDefault();
      return {
        x: event.clientX,
        y: event.clientY
      };
    }),
    takeUntil(mouseUp$)
  )
  .subscribe(pos => {
    // Draggable is absolutely positioned
    draggable.style.left = pos.x + 'px';
    draggable.style.top = pos.y + 'px';
  });
});
