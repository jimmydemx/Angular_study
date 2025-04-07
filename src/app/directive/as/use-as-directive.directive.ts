import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appUseAsDirective]'
})
export class UseAsDirectiveDirective {
  public _context = new AppUseAsContext();
  constructor(private viewContainer:ViewContainerRef, private templateRef: TemplateRef<any>) {

  }


  /**
   *   as 必须要  this._context.$implicit = this._context.appUseAsDirective 才能够有值
    */
  @Input()
  set appUseAsDirective(condition:string){
    this._context.$implicit = this._context.appUseAsDirective = condition;
    this._context.level = "super";

    if(condition){
      this.viewContainer.createEmbeddedView(this.templateRef,this._context)
    }else {
      this.viewContainer.clear();
    }
  }

  @Input()
  set appUseAsDirectiveAs(value: string) {
    this.viewContainer.createEmbeddedView(this.templateRef,{
      $implicit:value,
      level:"super"
  })
  }

}


class AppUseAsContext {

  public $implicit: string =''
  public level: string=''
  public appUseAsDirective:string=''
  constructor(

  ) {}

  // get first(): boolean { return this.index === 0; }
  // get last(): boolean { return this.index === this.count - 1; }
}

