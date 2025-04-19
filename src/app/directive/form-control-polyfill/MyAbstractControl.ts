import {BehaviorSubject, Observable} from "rxjs";

export abstract class MyAbstractControl<T=any>{

    protected _value!:T ;
    protected _status : 'VALID' | 'INVALID' = 'VALID';
    protected  _touched = false;
    protected _valueChanges:BehaviorSubject<T> = new BehaviorSubject<T>(this._value)

    constructor(initValue:T) {
      this._value = initValue;
    }

    get value():T | undefined{
      return this._value;
    }

    abstract setValue(value:T):void;

    get valid(){
      return this._status == "VALID";
    }

    get touched(){
      return this._touched;
    }

    markAsTouched(){
      this._touched = true;
    }

    get valueChanges():Observable<T>{
      return this._valueChanges.asObservable();
    }

}
