import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    <p>
      test works!
    </p>
    <app-test-child [familyString]="'4'" (eatTogether)="eat($event)"></app-test-child>

    <app-test-counter></app-test-counter>
    
  `,
  styles: [
  ]
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public eat(e:string){
    console.log(e);
  }
}
