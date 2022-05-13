import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'custom-value-access',
  template: `
  <button  (click)="setValue()">{{value}}</button>
  `, 
  providers:[{
    provide:NG_VALUE_ACCESSOR,
    useExisting:CustomValueAccessComponent,
    multi:true
  }]  
})
export class CustomValueAccessComponent implements ControlValueAccessor,OnInit {
  public value = false;
  public Onchange!:(value: boolean) => void

  @Output() clickEvent=new EventEmitter()
  constructor() {

   }
  writeValue(obj: boolean): void {
    this.value = obj;   

  }
    
  registerOnChange(fn: any): void {
    this.Onchange = fn;
    console.log("onChange",this.Onchange);
    
  }
  registerOnTouched(fn: any): void {
  }


  ngOnInit(): void {
  }

  setValue(){
    this.value = !this.value;
    debugger;
    this.Onchange(this.value)

    this.clickEvent.emit();
  }


}
