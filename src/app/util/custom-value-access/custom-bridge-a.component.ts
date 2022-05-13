import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { bridge } from './value.interface';
import { BRIDGE } from './value.token';


@Component({
  selector: 'custom-bridge-a',
  template: `
    <p #p>
     bridge-a
    </p>
    <style>
      p{
        height: 8rem;
        width:  8rem;
        border: 1px red solid;
      }
    </style>  
  `,
  providers:[{
    provide: BRIDGE,
    useExisting: CustomBridgeAComponent
  }]


})
export class CustomBridgeAComponent implements OnInit,bridge {

  constructor(private rd2:Renderer2) { }
  @ViewChild('p') pd!:ElementRef
  ngOnInit(): void {
  }

  ChangeShape(){
    this.rd2.setStyle(this.pd.nativeElement,'border','2px blue dashed')
  }



}
