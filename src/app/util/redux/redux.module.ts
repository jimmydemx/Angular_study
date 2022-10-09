import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReduxComponent } from './redux.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ReduxComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[ReduxComponent]
})
export class ReduxModule { }
