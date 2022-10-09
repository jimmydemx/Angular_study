import { Injectable } from '@angular/core';

@Injectable({
  providedIn: null // this is just to say that, it shall be explicitly provided
})
export class InjectableService1 {

  constructor() { 

    console.log("this is InjectableService1")
  }
}
