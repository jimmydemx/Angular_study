import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-with-child',
  template: `
    <app-component-is-child [initialInputButtonName]="'Input Button name to child'" (updateMessage)="onUpdateMessageFromChild($event)"></app-component-is-child>
    {{childMessage}}
  `,
  styles: [
  ]
})
export class ComponentWithChildComponent implements OnInit {

  constructor() { }
  childMessage = ''

  ngOnInit(): void {
  }

  onUpdateMessageFromChild(e:string){
    this.childMessage = e;
  }

}
