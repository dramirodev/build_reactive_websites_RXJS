import { fromEvent } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
// Element
let draggable = document.querySelector('#draggable');
// Observables
let mouseEnter$ = fromEvent(draggable, 'mouseenter');
let mouseDown$ = fromEvent(draggable, 'mousedown');
let mouseMove$ = fromEvent(draggable, 'mousemove');
let mouseUp$ = fromEvent(draggable, 'mouseup');
mouseEnter$.subscribe(() => {
    mouseDown$.subscribe(() => {
        mouseMove$
            .pipe(map(event => {
            event.preventDefault();
            return {
                x: event.clientX,
                y: event.clientY
            };
        }), takeUntil(mouseUp$)).subscribe(pos => {
            // Draggable is absolutely positioned
            draggable.style.left = pos.x + 'px';
            draggable.style.top = pos.y + 'px';
        });
    });
});
