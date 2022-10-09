import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { SharedModule } from '../shared/shared.module';
import { TestChild1Component } from './test-child1/test-child1.component';
import { TestCounterComponent } from './test-counter/test-counter.component';


@NgModule({
  declarations: [
    TestComponent,
    TestChild1Component,
    TestCounterComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    TestComponent,
  ]
})
export class TestModule { }
