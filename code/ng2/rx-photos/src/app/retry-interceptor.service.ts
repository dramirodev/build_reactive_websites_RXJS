import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { retryWhen, flatMap, delay } from 'rxjs/operators';
import {
  HttpResponse,
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http'; // (1)

@Injectable()
export class RetryInterceptorService implements HttpInterceptor { // (2)

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { // (3)
    return next.handle(request)
    .pipe(
      retryWhen(err$ =>
        err$
        .pipe(
          flatMap(err => {
            if (err instanceof HttpErrorResponse
              && err.status < 600 && err.status > 499) {
              return of(null) // (4)
                .pipe(delay(500)); // (5)
            }
            return throwError(err); // (6)
          })
        )
      )
    );
  }
}
