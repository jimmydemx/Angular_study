import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AnimateModule } from './animate/animate.module';
import { AppComponent } from './app.component';
import { UtilModule } from './util/util.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    UtilModule,
    AnimateModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
