import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { BrowserModule } from '@angular/platform-browser';
import { DebugPipe } from './pipes/debug.pipe';


@NgModule({
  declarations: [
    DebugPipe
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
    DebugPipe

  ]
})
export class SharedModule { }
