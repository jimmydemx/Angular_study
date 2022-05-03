import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comp',
  templateUrl: './comp.component.html',
  styleUrls: ['./comp.component.scss']
})
export class CompComponent implements OnInit {

  @Input() parent!:any;

  constructor() {

    console.log('Parent constructor')
   }

  ngOnChanges(){

    console.log('Parent Onchanges')

  }

  ngOnInit(){
    console.log('Parent Init')
  }

}
