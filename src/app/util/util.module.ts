import { ApplicationRef, forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjvschemaComponent } from './ajvschema/ajvschema.component';
import { UtilComponent } from './util.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchemadommarkerDirective } from './ajvschema/schemadommarker.directive';
import { HookDirective } from './hooks/direc.directive';
import { CustomValueAccessComponent } from './custom-value-access/b-custom-value-access.component';
import { CustomWrapperComponent } from './custom-value-access/custom-wrapper.component';
import { CustomBridgeAComponent } from './custom-value-access/c-custom-bridge-a.component';
import { CustomBridgeBComponent } from './custom-value-access/c-custom-bridge-b.component';
import { DependencyInjectAComponent } from './dependency-inject/dependency-inject-a.component';
import { DependencyInjectBComponent } from './dependency-inject/dependency-inject-b.component';
import { DependencyInjectWrapperComponent } from './dependency-inject/dependency-inject-wrapper.component';
import { DForwardRefComponent } from './custom-value-access/d-forward-ref.component';
import { CCustomBridgeDirectiveDirective } from './custom-value-access/c-custom-bridge-directive.directive';
import { TestsComponent } from './tests/tests.component';
import { ESearchFormComponent } from './custom-value-access/e-search-form.component';
import { ESearchContainerComponent } from './custom-value-access/e-search-container.component';
import { SharedModule } from '../shared/shared.module';
import { AWrapperComponent } from './custom-value-access/a-all-wrapper.component';
import { ParentHookComponent } from './hooks/parentHook.component';
import { ChildHookComponent } from './hooks/childhook.component';
import { DepInjectDirective } from './dependency-inject/dep-inject.directive';
import { DepInject2Directive } from './dependency-inject/dep-inject-2.directive';
import { BootstrapComponent } from './bootstrap/bootstrap.component';


const HOOK_COMPONENTS =[];



@NgModule({
  declarations: [
    AjvschemaComponent,
    UtilComponent,
    SchemadommarkerDirective,
    ParentHookComponent,
    ChildHookComponent,
    HookDirective,
    CustomValueAccessComponent,
    CustomWrapperComponent,
    CustomBridgeAComponent,
    CustomBridgeBComponent,
    DependencyInjectWrapperComponent,
    DependencyInjectAComponent,
    DependencyInjectBComponent,
    DForwardRefComponent,
    CCustomBridgeDirectiveDirective,
    TestsComponent,
    ESearchFormComponent,
    ESearchContainerComponent,
    AWrapperComponent,
    DepInjectDirective,
    DepInject2Directive,
    BootstrapComponent

  ],
  imports: [
    CommonModule,
    AceEditorModule,
    FormsModule,
    ReactiveFormsModule,SharedModule
  ],
  exports:[
    AjvschemaComponent,
    UtilComponent,
    AceEditorModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
})
export class UtilModule {

  constructor(appRef: ApplicationRef){
    console.log(appRef);
    
  }
 }
