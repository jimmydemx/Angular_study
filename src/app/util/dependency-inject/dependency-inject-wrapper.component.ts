import { Component, ComponentRef, forwardRef, Inject, Injector, NgModuleRef, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UtilModule } from '../util.module';
import { DependencyInjectAComponent } from './dependency-inject-a.component';
import { DependencyInjectBComponent } from './dependency-inject-b.component';
import { InjectableService1 } from './injectable-service-1.service';
import { hello, INJECT_HELLO_I, INJECT_HELLO_II, INJECT_RELOAD, TRIGGER_RELOAD_TYPE } from './injection_tokens';

@Component({
  selector: 'app-dependency-inject-wrapper',
  template: `
    <!-- the selector of "de-inject-2" is p[appDepInject], the selector of "dep-inject" is  [appDepInject]-->
    <!-- both instance of the 2 directives will be hosted on p -->
    <!-- "de-inject-2"  provide itself, and  in "de-inject" it will inject "de-inject-2" , it is valid-->
    <p  appDepInject>123</p>

    <!-- the selector of "de-inject-2" is p[appDepInject] thus , the instance will not be created ,only "dep-inject" -->
    <!-- in "dep-inject", inject DepInject2Directive:DepInject2Directive, since there is no instance of "de-inject-2" on it self, it will return null -->
    <app-dependency-inject-b appDepInject>

    <!-- app-dependency-inject-a is a component,  @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) will only search on itself, so it will return null-->
    <!-- a directive, like "de-inject-2" or "dep-inject" will search on the hosted DOM, like <p> -->
  
    <app-dependency-inject-a></app-dependency-inject-a>
    </app-dependency-inject-b>
  `,
  providers:[
    {provide:NG_VALUE_ACCESSOR,useExisting: DependencyInjectWrapperComponent},
    InjectableService1,
    {provide:INJECT_HELLO_I, useFactory:()=>"INJECT_HELLO_I vaule changed in DependencyInjectWrapperComponent"}
  ]

})
export class DependencyInjectWrapperComponent implements OnInit,ControlValueAccessor{

  
  constructor( private InjectService1: InjectableService1, 
              private inject: Injector, 
              private moduleRef: NgModuleRef<UtilModule>,
              @Inject(INJECT_HELLO_I) private hello: string,
              @Inject(INJECT_RELOAD) private readonly injectReolad: any
              
    
    ) { 
    //----------------- explicitly/implicitly Proivde  INJECT_HELLO_I---------------------//  
    
    // Injectiontoken no need to provide in the model/component, then it can directly @inject() , 
    // INJECT_HELLO_I return { greetings:'hello',question: 'how are you?'}

    // however if explicity provide another value, it will call the overrided function, the result is: INJECT_HELLO_I vaule changed in DependencyInjectWrapperComponent
  
    //----------------- end: explicitly/implicitly Proivde  INJECT_HELLO_I---------------------//
    
    
    // Note: here return null 
    // @Inject(INJECT_HELLO_II) private inject2: any  
    
    // this.moduleRef.componentFactoryResolver.resolveComponentFactory()
    
    //----------------- customzied create Injector and Promide ---------------------//
    // Here though INJECT_HELLO_I has original value/userfactory in injection_token.ts, here use Injector to give it another value
    // this Injector is diffrent from other Injector, i.e. the private inject: Injector
    const inj =Injector.create({
      providers: [{
        provide: INJECT_HELLO_I,
        useValue: {
          a: 1,
          b: 2,
        }
      }],
    })

    console.log("INJECT_HELLO_I: ",inj.get(INJECT_HELLO_I), // {a:1,b:2} value get from customzied defined Injector
     this.hello // thought INJECT_HELLO_I providedin root, however, here in this component, it has explicitly provided returning another value
     // which is:  INJECT_HELLO_I vaule changed in DependencyInjectWrapperComponent
     
     ) 

     console.log("fwefwefwe",this.inject.get(INJECT_HELLO_I),this.inject)


     //-----------------------reload ---------------------------------//

     /**
      * warning: put it in construction will CAUSE ETERNAL RELOAD, 
      * Note: The type of @Inject()injectReolad depends on the type in InjectionToken<TRIGGER_RELOAD_TYPE>, TRIGGER_RELOAD_TYPE is a function
      * herein this.injectRoload shall be the TRIGGER_RELOAD_TYPE, that is a function,
      * and by calling this function i.e. this.injectReolad({event:"triggerAEvent"}), it will call the function in factory
      * 
      */
     
     // this.injectReolad({event:"triggerAEvent"})

    
    

    //--------------------moduleRef, componentRef ------------------------// 
    console.log(this.moduleRef) 

    setTimeout(() => {
      // moduleRef can delete the whole module，this is to delete the whole UtilModule
      // this.moduleRef.destroy()
      
    }, 3000);
    
  }
  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }


  ngOnInit(): void {
 
    
  }

}
