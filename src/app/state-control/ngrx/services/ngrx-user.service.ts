import { Injectable } from '@angular/core';
import {delay, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NgrxUserService {

  constructor() { }


  getUser(){
    return of("ngrx user").pipe(delay(100));
  }
}
