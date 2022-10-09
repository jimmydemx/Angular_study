import { Directive, Inject, Optional, Self, SkipSelf } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DepInject2Directive } from './dep-inject-2.directive';

@Directive({
  selector: '[appDepInject]'
})
export class DepInjectDirective {

  constructor( @Optional() @SkipSelf() @Inject(NG_VALUE_ACCESSOR) valueAccessors: ControlValueAccessor[],
  @Optional() @Self() DepInject2Directive:DepInject2Directive) {

    console.log('valueAccessors',valueAccessors,DepInject2Directive);
    
   }

}
