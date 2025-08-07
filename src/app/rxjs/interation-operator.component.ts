import { Component, OnInit } from '@angular/core';
import {concatMap, count, Observable, Subject, tap, timer} from "rxjs";

@Component({
  selector: 'app-interation-operator',
  template: `
    <p>
      {{$ob | async }}
    </p>
  `,
  styles: [
  ]
})
export class InterationOperatorComponent implements OnInit {

  constructor() { }

  private ObservableList: Array<Observable<any>> = []

   $ob: any  = null;
  ngOnInit(): void {

    for(let i=1;i<=10;i++){
      this.ObservableList.push(
        timer(1000).pipe(tap(()=>{
          console.log("this is："+i+"time is："+new Date().getSeconds());
        }))
      )
    }

    this.ObservableList.forEach((o,i)=>{
      if(i==0){
        this.$ob = o.pipe(count())
      }else
      {
        this.$ob = this.$ob.pipe(concatMap(()=>o))
      }

    })
  }

}
