import { inject, InjectionToken } from "@angular/core";

export interface hello{
    greetings: string;
    question: string;
}

// export const WINDOW = new InjectionToken(<Window>)('global Window object',{
    
// })

export const INJECT_HELLO = new InjectionToken<hello>('the first injection', {
    factory:()=>{
        return {
            greetings:'hello',
            question: 'how are you?'
        }
    }
})

export const INJECT_HELLO_I = new InjectionToken<any>('inject Inject_hello',{
providedIn:"root",
factory:()=>{
    var hello = inject(INJECT_HELLO)
     hello.greetings = 'hola'
     return hello;
 }
})

export type TRIGGER_RELOAD_TYPE= (trigger:{event: "triggerAEvent" | "triigerBEvent"})=>void

export const INJECT_RELOAD= new InjectionToken<TRIGGER_RELOAD_TYPE>('trigger reolad type',{
    factory:()=>()=>location.reload()
})




export const INJECT_HELLO_II = new InjectionToken<any>("NO INITIAL INJECTION")
