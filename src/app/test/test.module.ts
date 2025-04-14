import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { SharedModule } from '../shared/shared.module';
import { TestChild1Component } from './test-child1/test-child1.component';
import { TestCounterComponent } from './test-counter/test-counter.component';
import { CounterComponentComponent } from './component/counter-component.component';
import {UtilModule} from "../util/util.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TestComponent,
    TestChild1Component,
    TestCounterComponent,
    CounterComponentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
  ],
  exports: [
    TestComponent,
    CounterComponentComponent,
  ]
})
export class TestModule { }
