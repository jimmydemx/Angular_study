import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { BrowserModule } from '@angular/platform-browser';
import { DebugPipe } from './pipes/debug.pipe';
import { ButtonDisplayComponent } from './components/button-display.component';


@NgModule({
  declarations: [
    DebugPipe,
    ButtonDisplayComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule
  ],
  exports:[
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
    DebugPipe,
    ButtonDisplayComponent

  ]
})
export class SharedModule { }
