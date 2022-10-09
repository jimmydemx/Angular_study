import { Component, Inject, Injector, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'custom-value-access-wrapper',
  template: `
  <!-- custrom From Field Control -->
  <!-- Note: the idea is :
      1. the components to implement MatFormFieldControl, provide itself as MatFormFieldControl
      2. include the component inside <mat-form-field>, and Inject it, so <mat-form-field> can use its property/parameters 
  -->
  <app-e-search-container></app-e-search-container>
  <!-- end: custrom From Field Control -->


  <!-- use ngModel to include formControl directive-->
  <input type="text"  #name='ngModel' [(ngModel)]="binding" required/>
  <input type="number" #num = 'ngModel' [(ngModel)]="binding"/>

  <!-- end: use ngModel to include formControl directive -->




  `,
  providers:[{provide:NG_VALUE_ACCESSOR, useClass: AWrapperComponent}],
  styles: [
  ]
})
export class AWrapperComponent implements OnInit {

  @ViewChild('name') ngModel!:NgModel;
  @ViewChild('num') num!:NgModel;
  public binding = 1;
  constructor() { 
    // @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) valueAccessors: ControlValueAccessor[]
    // console.log(valueAccessors);
    
  }

  ngOnInit(): void {
    // console.log('injectors',this.injector.get(NG_VALUE_ACCESSOR));
    
  }
  ngAfterViewInit(){
    console.log("ngModel", this.ngModel, this.num, this.ngModel.errors)

    this.ngModel.valueChanges?.subscribe(val=>console.log("errors",this.ngModel.errors))

  
  }

  

}
