import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-component-is-child',
  template: `
    <button (click)="onEmitToParent()">{{initialInputButtonName}} </button>
  `,
  styles: [
  ]
})
export class ComponentIsChildComponent implements OnInit {

  constructor() { }

  @Input()
  initialInputButtonName:string=''

  @Output()
  updateMessage  = new EventEmitter<string>();

  ngOnInit(): void {
  }

  onEmitToParent(){
    this.updateMessage.emit("this is message from child");
  }

}

