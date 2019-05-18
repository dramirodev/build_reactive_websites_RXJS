import { Injectable } from '@angular/core';
import {
  Router, Resolve
} from '@angular/router';
import { combineLatest } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { pluck, map } from 'rxjs/operators';

@Injectable()
export class UserDetailResolver implements Resolve<any> { // (1)
  constructor() { }

  resolve() {
    return combineLatest(
      ajax('http://localhost:3000/ng2/reactiveForms/userData/addresses')
      .pipe(pluck('response')),
      ajax('http://localhost:3000/ng2/reactiveForms/userData/creditCards')
      .pipe(pluck('response'))
    )
    .pipe(
      map(responses => {
        return {
          addresses: responses[0],
          creditCards: responses[1]
        };
      })
    );
  }
}
