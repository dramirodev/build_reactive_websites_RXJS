import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import {} from 'zone.js';
import { merge } from 'rxjs';
import { map, pairwise, filter } from 'rxjs/operators';

@Injectable()
export class PerfService {

  constructor(private zone: NgZone) {
    // console.log(zone);
    // const z = (<any>zone)._inner.fork({
    //   name: 'z',
    //   onScheduleTask(delegate, current, target, task) {
    //     console.log('z', Zone.current.name);
    //     console.log(JSON.stringify(task));
    //   }
    // });

    // function a() {}

    // function b() {
    //   // synchronously triggers `onHasTask` event with
    //   // change === "macroTask" since `setTimeout` is a macrotask
    //   setTimeout(a, 2000);
    // }

    // z.run(b);

    const unstableLatest$ = zone.onUnstable
    .pipe(
      map(() => {
        return {
          type: 'unstable',
          time: performance.now()
        };
      })
    );
    const stableLatest$ = zone.onStable
    .pipe(
      map(() => {
        return {
          type: 'stable',
          time: performance.now()
        };
      })
    );

    merge(
      unstableLatest$,
      stableLatest$
    )
    .pipe(
      pairwise(),
      filter(([penultimate, latest]) => latest.type === 'stable'),
      map(([penultimate, latest]) => latest.time - penultimate.time)
    )
    .subscribe((w) => {
      console.log('CD took', w, 'ms');
    });

    /*
    // .do(asdf => console.log(asdf))
    .scan((acc, newData) => {
      // console.log(`Looking for ${acc.lookingFor}.  Found ${newData.type}`);
      if (acc.lookingFor === 'unstable' && newData.type === 'unstable') {
        console.log('Change Detection start');
        acc.latestStart = newData.time;
        acc.lookingFor = 'stable';
        return acc;
      }
      if (acc.lookingFor === 'stable' && newData.type === 'stable') {
        const timeTaken = newData.time - acc.latestStart;
        acc.lookingFor = 'unstable';
        console.log('CD finished, took:', timeTaken.toLocaleString(), 'ms');
        return acc;
      }
      // console.log('nothing hit');
      return acc;
    }, {
      lookingFor: 'unstable',
      latestStart: null
    })
    .subscribe((w) => {
      // console.log('Subscribe', w);
    });
    */
  }

}
