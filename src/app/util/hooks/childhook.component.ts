import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-childhook',
  template: `
    <p>hook child</p>
  `,
  styles: [
  ]
})
export class ChildHookComponent implements OnInit,AfterViewInit{


  constructor() {
    
   }
  ngAfterViewInit(): void {
    console.log('ChildHookComponent AfterViewInit')
  }

  ngOnInit(): void {

  }




}
