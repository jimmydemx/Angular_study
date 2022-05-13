import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { bridge } from './value.interface';
import { BRIDGE } from './value.token';

@Component({
  selector: 'custom-bridge-b',
  template: `
    <p #p>
      bridge-b
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
      useExisting: CustomBridgeBComponent
    }]
})
export class CustomBridgeBComponent implements OnInit,bridge {

  constructor(private rd2:Renderer2) { }
  @ViewChild('p') pd!:ElementRef

  ngOnInit(): void {
  }


  ChangeShape(){
    this.rd2.setStyle(this.pd.nativeElement,'border-radius','8rem')
  }
}
