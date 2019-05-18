import { fromEvent } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
let draggable = document.querySelector('#draggable');
let mouseDown$ = fromEvent(draggable, 'mousedown');
let mouseMove$ = fromEvent(document, 'mousemove');
let mouseUp$ = fromEvent(document, 'mouseup');
mouseDown$.subscribe(() => {
    mouseMove$
        .pipe(map(event => {
        event.preventDefault();
        return {
            x: event.clientX,
            y: event.clientY
        };
    }), takeUntil(mouseUp$))
        .subscribe(pos => {
        // Draggable is absolutely positioned
        draggable.style.left = pos.x + 'px';
        draggable.style.top = pos.y + 'px';
    });
});
