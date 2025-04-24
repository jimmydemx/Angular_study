import {Directive, Host, HostListener, Input} from '@angular/core';
import {TabSelectDirective} from "./tab-select.directive";

@Directive({
  selector: '[tabOptions]'
})
export class TabOptionsDirective {

  @Input()
  tabOptions:string =''
  constructor(
    @Host() private tabSelectDirective:TabSelectDirective
  ) { }

  @HostListener('click')
  public onClick(){
    console.log(this.tabOptions);
    this.tabSelectDirective.select(this.tabOptions);
  }

}
