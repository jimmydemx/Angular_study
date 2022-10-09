import { Directive } from '@angular/core';

@Directive({
  selector: 'p[appDepInject]',
  providers:[DepInject2Directive]
})
export class DepInject2Directive {

  constructor() { 
    console.log('run dep-inject-2')
  }

}
