import { ajax } from 'rxjs/ajax';

let progressBar = <HTMLElement>document.querySelector('.progress-bar');
let arrayOfRequests = [];
let endpoint = 'http://localhost:3000/api/managingAsync/loadingbar/';
for (let i = 0; i < 128; i++) {
  arrayOfRequests.push(ajax(endpoint + i));
}
