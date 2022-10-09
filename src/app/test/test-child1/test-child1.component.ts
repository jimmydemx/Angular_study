import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-test-child',
  template: `
    <p>
      test-child1 works!
    </p>
  `,
  styles: [
  ]
})
export class TestChild1Component implements OnInit {

  @Input()
  familyString:string ='';

  @Output() eatTogether= new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.eatTogether.emit("already, let s eat together");
  }
}
