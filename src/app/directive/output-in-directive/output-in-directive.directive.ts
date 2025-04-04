import {Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CustomForm} from "./CustomForm";

@Directive({
  selector: '[appOutputInDirective]'
})
export class OutputInDirectiveDirective implements  OnChanges{

  @Input("appOutputInDirective")
  form:CustomForm | undefined =undefined;

  @Output()
  change = new EventEmitter<CustomForm>()

  constructor() { }

  ngOnChanges(changes: any): void {
    console.log(changes)
    if(changes.form){
      this.change.emit(changes.form.currentValue)
    }

  }

}
