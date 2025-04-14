import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter-component',
  template: `
    <button (click)="count=count+1" data-testid="increment-button">Click to increase</button>
    <div  class="count" data-testid="count">{{count}}</div>
    <input  data-value-testid="count" [value]="count" />
    <input  data-form-testid="count" [value]="count" />
  `,
  styles: [
  ]
})
export class CounterComponentComponent implements OnInit {

  constructor() { }

  public count:number = 0;
  ngOnInit(): void {
  }

}
