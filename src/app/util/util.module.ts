import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjvschemaComponent } from './ajvschema/ajvschema.component';
import { UtilComponent } from './util.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { AceEditorComponent } from './ace-editor/ace-editor.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchemadommarkerDirective } from './ajvschema/schemadommarker.directive';
import { CompComponent } from './direcCom/comp.component';
import { DirecDirective } from './direcCom/direc.directive';



@NgModule({
  declarations: [
    AjvschemaComponent,
    UtilComponent,
    AceEditorComponent,
    SchemadommarkerDirective,
    CompComponent,
    DirecDirective,
    
    
  ],
  imports: [
    CommonModule,
    AceEditorModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    AjvschemaComponent,
    UtilComponent,
    AceEditorModule,
    FormsModule,
    ReactiveFormsModule
    
  ]
})
export class UtilModule { }
