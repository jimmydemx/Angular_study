import {MyAbstractControl} from "./MyAbstractControl";
import {map, Observable} from "rxjs";
import {combineLatest} from "rxjs";

export class MyFormGroup<T extends Record<any, MyAbstractControl>>{

  private _valueChanges!:Observable<any>;

  constructor(private controls:T) {

    const allChanges = Object.entries(this.controls).map(([key,control])=>{
      return control['valueChanges'];
    })

    this._valueChanges = combineLatest(allChanges).pipe(map(()=>this.value))
  }


  get(controlName:string):MyAbstractControl{
    return this.controls[controlName]
  }

  setValue(values: Record<string, any>){
    for(const key in values){
      if(this.controls[key]){
        this.controls[key].setValue(values[key]);
      }
    }
  }

  get value():Record<any, any>{
    const val: Record<string, any>={};
    for(const key in this.controls){
      val[key] = this.controls[key].value;
    }
    return val;

  }

  get valid(): boolean {
    return Object.values(this.controls).every(control => control.valid);
  }




}
