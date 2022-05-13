import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjvschemaComponent } from './ajvschema/ajvschema.component';
import { UtilComponent } from './util.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchemadommarkerDirective } from './ajvschema/schemadommarker.directive';
import { CompComponent } from './direcCom/comp.component';
import { DirecDirective } from './direcCom/direc.directive';
import { CustomValueAccessComponent } from './custom-value-access/custom-value-access.component';
import { CustomWrapperComponent } from './custom-value-access/custom-wrapper.component';
import { CustomBridgeAComponent } from './custom-value-access/custom-bridge-a.component';
import { CustomBridgeBComponent } from './custom-value-access/custom-bridge-b.component';




@NgModule({
  declarations: [
    AjvschemaComponent,
    UtilComponent,
    SchemadommarkerDirective,
    CompComponent,
    DirecDirective,
    CustomValueAccessComponent,
    CustomWrapperComponent,
    CustomBridgeAComponent,
    CustomBridgeBComponent,


    
    
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
