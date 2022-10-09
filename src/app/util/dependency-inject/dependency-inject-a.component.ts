import {Component, ComponentRef, Inject, OnInit, Optional, Self, SkipSelf} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DependencyInjectWrapperComponent} from './dependency-inject-wrapper.component';

interface StudyinSchool {
  GetUp: () => void;
  EatBreakfast: () => void;
  TakeBus: () => void;
}

@Component({
  selector: 'app-dependency-inject-a',
  template: `
    <p>
      dependency-inject works!
    </p>
  `,

})
export class DependencyInjectAComponent implements OnInit, StudyinSchool {

  constructor(@Optional() @Self() @Inject(NG_VALUE_ACCESSOR) valueAccessors: ControlValueAccessor[]
  ) {

    console.log("valueAccessors", valueAccessors);

  }


  // implement StudyinSchool Interface
  GetUp() {
    console.log("A component getup");

  }


  EatBreakfast() {
    console.log("A component eat breakfast");
  };


  TakeBus() {
    console.log("A component Take bus");
  };


  // end StudyinSchool Interface


  public variable1 = 1;

  ngOnInit(): void {
  }

}
