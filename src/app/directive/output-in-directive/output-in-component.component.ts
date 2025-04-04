import { Component, OnInit } from '@angular/core';
import {CustomForm} from "./CustomForm";

@Component({
  selector: 'app-output-in-component',
  template: `
    <button (click)="onAddAge()">CLICK HERE</button>

    <div *ngIf="!!customForm" [appOutputInDirective]="customForm" (change)="onChangeform($event)">
      <p>{{customForm.name}}</p>
      <p>{{customForm.age}}</p>
      <p>{{customForm.teacher}}</p>
    </div>
  `,
  styles: [
  ]
})
export class OutputInComponentComponent implements OnInit {

  constructor() { }

  public customForm:CustomForm | undefined = undefined;

  ngOnInit(): void {
    this.customForm = new CustomForm("jack",2,`mike`);
  }

  onAddAge(){
    if(this.customForm){
      this.customForm ={
        ...this.customForm,
          age:this.customForm.age+1
      }
    }
  }

  onChangeform(e:CustomForm){
    console.log(e.age);
  }


}
