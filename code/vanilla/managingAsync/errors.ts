import { ajax } from 'rxjs/ajax';
import { merge } from 'rxjs';
import { scan } from 'rxjs/operators';

let progressBar = <HTMLElement>document.querySelector('.progress-bar');
let msgArea = <HTMLElement>document.querySelector('.alert');
let arrayOfRequests = [];
let endpoint = 'http://localhost:3000/api/managingAsync/assets/bad/';
for (let i = 0; i < 128; i++) {
  arrayOfRequests.push(ajax(endpoint + i));
}

let loadingRequestsBad$ = merge(...arrayOfRequests);
