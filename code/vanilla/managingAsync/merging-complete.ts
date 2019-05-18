import { ajax } from 'rxjs/ajax';
import { merge } from 'rxjs';

let arrayOfRequests = [];
let endpoint = 'http://localhost:3000/api/managingAsync/loadingbar/';
for (let i = 0; i < 128; i++) {
  arrayOfRequests.push(ajax(endpoint + i));
}

merge(...arrayOfRequests)
.subscribe(
  val => console.log(val),
  err => alert(err)
);
