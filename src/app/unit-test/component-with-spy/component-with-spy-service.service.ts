import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentWithSpyServiceService {

  constructor() { }


  getMessage():string{
    return  "this is the message showing.";
  }
}
