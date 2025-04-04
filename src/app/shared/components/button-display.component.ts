import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-display',
  template: `
    <button>click here</button>
    <ng-content></ng-content>
  `,
  styles: [
  ]
})
export class ButtonDisplayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
