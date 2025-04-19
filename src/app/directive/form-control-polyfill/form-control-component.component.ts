import { Component, OnInit } from '@angular/core';
import {MyFormControl} from "./MyFormControl";

@Component({
  selector: 'app-form-control-component',
  template: `
        <input   [MyFormControl]="inputControl"   />
  `,
  styles: [
  ]
})
export class FormControlComponentComponent implements OnInit {

  inputControl:MyFormControl = new  MyFormControl("lisa")

  constructor() { }

  ngOnInit(): void {

    this.inputControl.valueChanges.subscribe((value)=>{
      console.log(value)
    })
  }

}
