import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, of } from 'rxjs';
import { tag } from "rxjs-spy/operators";

interface ENDPOINTS{
  api: string;
  licenseCheck: string;
}

export interface DOG {
  message: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  private endpoints = new BehaviorSubject<ENDPOINTS | null>(null)
  public readonly api$ = this.endpoints.asObservable().pipe(filter(endpoints=>!!endpoints),
    map(endpoint=>endpoint?.api)).pipe(tag("some-tag"))

  //  source1 =of("some-value").pipe(tag("some-tag"));  
  
  

  readonly url=" http://localhost:3000/"

  getAllProfiles(){
   return this.http.get(this.url+"profile")

  }

  getProfilebyID(id:number){
    return this.http.get<{[key:string]:any}>(this.url+"profile",{params:{id:id}})
  }

  fetchEndpoints(){
    this.http.get<ENDPOINTS | null>(this.url+"crendential").subscribe({
      next: endpoints=>{
      this.endpoints.next(endpoints)
    },
    error:(err)=>console.log(err)
  })
  }

  test1(){
    return false 
  }
 /** 
 * @description: An API for test HTTP Request 
 * @author
 * @params
 * @returns
 */
  GetRandomDog():Observable<DOG>{
    return this.http.get<DOG>(`https://dog.ceo/api/breeds/image/random`);
  }


  

}



