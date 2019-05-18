let typeaheadInput = <HTMLElement>document.querySelector('#typeahead-input');
let typeaheadContainer = <HTMLElement>document.querySelector('#typeahead-container');
let usStates = ['alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut', 'delaware', 'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa', 'kansas', 'kentucky', 'louisiana', 'maine', 'maryland', 'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri', 'montana', 'nebraska', 'nevada', 'new hampshire', 'new jersey', 'new mexico', 'new york', 'north carolina', 'north dakota', 'ohio', 'oklahoma', 'oregon', 'pennsylvania', 'rhode island', 'south carolina', 'south dakota', 'tennessee', 'texas', 'utah', 'vermont', 'virginia', 'washington', 'west virginia', 'wisconsin', 'wyoming'];

import { fromEvent, from } from 'rxjs';
import { map, filter, tap, mergeMap, reduce} from 'rxjs/operators';

fromEvent<any>(typeaheadInput, 'keyup')
.pipe(
  map((e): string => e.target.value.toLowerCase()),
  tap(() => typeaheadContainer.innerHTML = ''),
  filter(val => val.length > 2),
  mergeMap(val =>
    from(usStates)
    .pipe(
      filter(state => state.includes(val)),
      map(state => state.split(val).join('<b>' + val + '</b>')),
      reduce((prev: any, state) => prev.concat(state), [])
    )
  )
)
.subscribe(
  (stateList: string[]) => typeaheadContainer.innerHTML += '<br>'
  + stateList.join('<br>')
);
