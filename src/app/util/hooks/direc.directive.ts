import { Directive, Inject, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appDirec]',
  exportAs:'hookdirective'
})
export class HookDirective {


  
  @Input('appDirec') directive!:any;
  constructor() {

    console.log('directive constructor')
   }

  ngOnChanges(){

    console.log('directive Onchanges')

  }

  ngOnInit(){
    console.log('directive Init')
  }

}
