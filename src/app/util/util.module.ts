import { ApplicationRef, APP_INITIALIZER, forwardRef, InjectionToken, NgModule, OnInit } from '@angular/core';
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
import { ApiService } from '../shared/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { interval,pipe, take, tap } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { ReduxModule } from './redux/redux.module';
import { TestDogComponent } from './tests/test-dog/dog.component';


const HOOK_COMPONENTS =[];

export const APP_EXTR = new InjectionToken<any>("app_extra")

const ANGULAR_CORE_MODULES= [HttpClientModule]

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
    BootstrapComponent,
    TestDogComponent,



  ],
  imports: [
    ANGULAR_CORE_MODULES,
    CommonModule,
    AceEditorModule,
    FormsModule,
    ReactiveFormsModule,SharedModule,BrowserModule,
    ReduxModule

  ],
  exports:[
    AjvschemaComponent,
    UtilComponent,
    AceEditorModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [{
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: (config: ApiService)=>{
      return ()=>{
        console.log("entering UtilModule Bootstrapping...")
        config.fetchEndpoints();
        // block the bootstrapping then
        return config.api$.pipe(take(1),tap(val=>console.log("bootstrap",val)))
      }

    },
    deps:[ApiService]
  },
  {
    provide: APP_EXTR,
    useValue: "fawfw",
  }



],
bootstrap:[UtilComponent]

})
export class UtilModule{

  constructor( private api:ApiService){

     // creating UtilModule before execute APP_INITIALIZER, therefore,display order:
     // creating UtilModule...
     // entering Bootstrapping...

    console.log("creating UtilModule...");

    this.api.api$.subscribe(val=>{
      console.log('xxxxx',val)
    })


    // console.log("appRef",this.api);

 }


  // ngDoBootstrap(appRef: ApplicationRef){
  //   this.api.getProfilebyID(1).subscribe(val=>{
  //     if(val?.["id"] !==2){
  //       console.log(val);
  //      appRef.bootstrap(BootstrapComponent)

  //     }
  // })


  // }
}
