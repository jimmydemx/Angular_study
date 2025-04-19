import {MyAbstractControl} from "./MyAbstractControl";

export class MyFormControl<T=any> extends MyAbstractControl{

  private _onChange: ((value:T)=> void)[]=[]

  constructor(initValue:T) {
    super(initValue);
  }

  setValue(value: T): void {
    this._value = value;
    this._valueChanges.next(value);
    this._onChange.forEach(fn=>fn(value));
  }

  registerOnChange(fn:(value:T)=>void):void{
    this._onChange.push(fn);
  }

}
