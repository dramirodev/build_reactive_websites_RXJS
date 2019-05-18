import { fromEvent } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
// Element
let draggable = <HTMLElement>document.querySelector('#draggable');

// Observables

let mouseEnter$ = fromEvent(draggable, 'mouseenter');
let mouseDown$ = fromEvent<MouseEvent>(draggable, 'mousedown');
let mouseMove$ = fromEvent<MouseEvent>(draggable, 'mousemove');
let mouseUp$ = fromEvent<MouseEvent>(draggable, 'mouseup');

mouseEnter$.subscribe(
    () => {
        mouseDown$.subscribe(
            () => {
                mouseMove$
                    .pipe(
                        map(event => {
                            event.preventDefault();
                            return {
                                x: event.clientX,
                                y: event.clientY
                            }
                        }),
                        takeUntil(mouseUp$)
                    ).subscribe(
                    pos => {
                        // Draggable is absolutely positioned
                        draggable.style.left = pos.x +'px';
                        draggable.style.top = pos.y + 'px';
                    });
            });
    });
