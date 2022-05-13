import { Component, ContentChild, ElementRef, forwardRef, Inject, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { bridge } from './value.interface';
import { BRIDGE } from './value.token';


@Component({
  selector: 'custom-access-value-wrapper',
  template: `
  <custom-value-access (clickEvent)="Onclick()" [formControl]='buttonControl'></custom-value-access>
  {{$bc | async}}


  <!-- bridge pattern -->
  <ng-content></ng-content>
  <button [appDirec]="1"  (click)="OnBridgeClick()">BridgeClick</button>
  <!-- end bridge pattern -->
  `,
})
export class CustomWrapperComponent implements OnInit {

  public $bc!:any
  public buttonControl= new FormControl("true")

  // bridge varibales
  @ContentChild(BRIDGE) bridgeComponents!: bridge;
   @ContentChild("appDirec",{read: ElementRef}) ScMaker!:ElementRef;
  
  constructor() {
      //   
      this.$bc=this.buttonControl.valueChanges
      this.$bc?.subscribe((val:any)=>console.log('bc',val))
     
   }

  ngOnInit(): void {
  }

  Onclick(){
    debugger;
    console.log(this.buttonControl.valueChanges);
    
    // 

  }


  // bridge functions
  OnBridgeClick(){

    this.bridgeComponents.ChangeShape()
    console.log(this.bridgeComponents,this.ScMaker)

    
  }

}
