import { fromEvent, merge, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, filter, distinctUntilChanged, debounceTime, tap, switchMap, catchError } from 'rxjs/operators';


let endpoint = `http://localhost:3000/api/advancedAsync/stackoverflow/`;
let searchBar = <HTMLElement>document.querySelector('input');
let resultsArea = <HTMLElement>document.querySelector('.results');
let loadingEl = <HTMLElement>document.querySelector('.loader');

function displayResults(results) {
  resultsArea.innerHTML = '';
  let listEl = document.createElement('ul');
  results.forEach(question => {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.href = question.link;
    a.innerHTML = question.title;
    li.appendChild(a);
    listEl.appendChild(li);
  });
  resultsArea.appendChild(listEl);
}
