import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


// import DevToolsPlugin from 'rxjs-spy-devtools-plugin';
import { create } from "rxjs-spy";


const spy = create();
spy.log("some-tag");
// const devtoolsPlugin = new DevToolsPlugin(spy, {
//   verbose: false,
// });
// spy.plug(devtoolsPlugin);

// We must teardown the spy if we're hot-reloading:
// if (module.hot) {
//   if (module.hot) {
//     module.hot.dispose(() => {
//       spy.teardown();
//     });
//   }
// }
