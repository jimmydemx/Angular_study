import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceWithGlobalVariableService {

  constructor() { }


  public counter = 0;

  public increase(){
    return this.counter++;
  }

  public decrease(){
    return this.counter--;
  }

  public reset(value:number){
    return this.counter =value;
  }
}
