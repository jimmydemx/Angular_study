import {Directive, ElementRef, forwardRef, HostListener, InjectionToken} from '@angular/core';

export interface MyControlValueAccessor<T=any>{
  writeValue(value: T): void;
  registerOnChange(fn: (value: T) => void): void;
  registerOnTouched(fn: () => void): void;
}


/**
 *  注意这里需要使用到InjectionToken以及useExisting，
 *  如果直接使用 providers:[MyControlValueAccessorDirective],
 *  之后在MyFormControlDirectiveDirective中Inject就会产生一个MyControlValueAccessorDirective实例
 *  然而，input[MyFormControl] 就会产生一个MyControlValueAccessorDirective实例
 *  这样就会产生 2 个实例，会出现问题，因为：
 *  1.MyFormControlDirectiveDirective只会调用其中的一个实例
 *  2. FormControlComponentComponent 会调用其中的另外一个实例
 */

export const MY_NG_VALUE_ACCESSOR: InjectionToken<MyControlValueAccessor[]> =
  new InjectionToken<MyControlValueAccessor[]>('NgValueAccessor');

@Directive({
  selector: 'input[MyFormControl]',
  providers:[
    {
      provide:MY_NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>MyControlValueAccessorDirective)
    }]
})
export class MyControlValueAccessorDirective implements MyControlValueAccessor{

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private el:ElementRef<HTMLInputElement>) {
    console.log("ValueAccessorDirective")
  }


  @HostListener('input',['$event.target.value'])
  handleInput(value:any):void{
    console.log('registerOnChange 被调用');
    this.onChange(value)
  }

  @HostListener('blur')
  handleBlur(): void {
    this.onTouched();
  }

  writeValue(value: any): void {
       this.el.nativeElement.value = value ??'';
    }
    registerOnChange(fn: (value: any) => void): void {
       this.onChange= fn;
    }
    registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
    }

}
