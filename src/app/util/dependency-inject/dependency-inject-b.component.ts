import { Component, Injector, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { INJECT_HELLO_I } from './injection_tokens';

@Component({
  selector: 'app-dependency-inject-b',
  template: `
    <ng-content></ng-content>
  `,
  providers:[
    {provide:NG_VALUE_ACCESSOR, useExisting:DependencyInjectBComponent}
  ]
})
export class DependencyInjectBComponent implements OnInit,ControlValueAccessor {

  constructor(private inject:Injector) {
    // error occurs here, though in parent component wrapper has created inj and provide INJECT_HELLO_I,
    // it can't be gotten in this child component
    // console.log(this.inject.get(INJECT_HELLO_I)) 

   }
  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}
