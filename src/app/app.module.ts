import { ApplicationRef, APP_INITIALIZER, DoBootstrap, Inject, Injectable, NgModule, PlatformRef } from '@angular/core';
import { BrowserModule, platformBrowser } from '@angular/platform-browser';
import { AnimateModule } from './animate/animate.module';
import { AppComponent } from './app.component';
import { APP_EXTR, UtilModule } from './util/util.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { ABootstrapComponent } from './util/bootstrap/a-bootstrap.component';
import { BBootstrapComponent } from './util/bootstrap/b-bootstrap.component';
import { interval } from 'rxjs';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppStoreModule } from './store';
import { TestModule } from './test/test.module';
import { OutputInDirectiveDirective } from './directive/output-in-directive/output-in-directive.directive';
import { OutputInComponentComponent } from './directive/output-in-directive/output-in-component.component';

// import { reducer } from './store/reducers/quote.reducer';



@NgModule({
  declarations: [
    AppComponent,
    OutputInDirectiveDirective,
    OutputInComponentComponent,
    // ABootstrapComponent,
    // BBootstrapComponent
  ],
  imports: [
    BrowserModule,
    AnimateModule,
    BrowserAnimationsModule,
    SharedModule,
    NgReduxModule,
    AppStoreModule,
    TestModule



    // EffectsModule.forRoot({user})

],
providers:[{provide:APP_INITIALIZER,multi:true, useValue:()=>console.log("Enterting AppModule bootstapping...")}],

  bootstrap: [AppComponent],
  entryComponents:[ABootstrapComponent,BBootstrapComponent],
})
export class AppModule{

  // constructor(private plataformref: PlatformRef, @Inject(APP_EXTR) private a:any){
  //   console.log('creating AppModule...',this.a);
  //
  //
  // }
  //
  // ngDoBootstrap(appRef: ApplicationRef): void {
  //   appRef.bootstrap(AppComponent)
  //   var ABootstrapComponentRef=appRef.bootstrap(ABootstrapComponent,"div.extra")
  //
  //   setTimeout(() => {
  //     appRef.detachView(ABootstrapComponentRef.hostView)
  //   }, 2000);
  //   // appRef.components()
  //  console.log("feafaw"  ,appRef.viewCount);

  //  setTimeout(() => {
  //   console.log("11fafawfwef");

  //   var a =platformBrowserDynamic().bootstrapModule(UtilModule).then((<any>window).appBootstrap && (<any>window).appBootstrap(),
  //   error=>console.log(error))
  //   console.log("fwfew",a)
    // this.plataformref.bootstrapModule(UtilModule)
  //  }, 7000);

  // }


}
