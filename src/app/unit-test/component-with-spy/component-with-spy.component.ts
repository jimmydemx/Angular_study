import { Component, OnInit } from '@angular/core';
import {ComponentWithSpyServiceService} from "./component-with-spy-service.service";

@Component({
  selector: 'app-component-with-spy',
  template: `
        <button (click)="onShowMessage()">click here</button>
        <p>{{ message }}</p>

  `,
  styles: [
  ]
})
export class ComponentWithSpyComponent implements OnInit {

  constructor(private componentWithSpyServiceService:ComponentWithSpyServiceService) { }

  message:string =''
  childMessage = ''
  ngOnInit(): void {
  }

  onShowMessage(){
    this.message=this.componentWithSpyServiceService.getMessage();
  }


}
