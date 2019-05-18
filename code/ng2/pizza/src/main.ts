console.log(Zone);
const myOverride = Zone.current.fork({
  name: 'kittensOverride',
  onHasTask(delegate, current, target, task) {
    console.log('can haz tasks');
  },
  onScheduleTask(delegate, currentZone, targetZone, task) {
    (task as any).id = Math.random().toString(36);
    const result = delegate.scheduleTask(targetZone, task);
    // console.log(task);
    // console.log(JSON.stringify(task));
    const name = task.callback.name;
    // console.log(`task with callback '${name}' is added to the task queue`);
    return result;
  },
  onInvokeTask(delegate, currentZone, targetZone, task, applyThis, applyAny) {
    console.log('task id is', (task as any).id);
    const result = delegate.invokeTask(targetZone, task, applyThis, applyAny);
    console.log(task);
    // console.log(JSON.stringify(task));
    const name = task.callback.toString();
    console.log('task fn', name);
    console.log(task.callback);
    // console.log(`task with callback '${name}' is removed from the task queue`);
   return result;
  }
});

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// myOverride.run(() => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
// });
