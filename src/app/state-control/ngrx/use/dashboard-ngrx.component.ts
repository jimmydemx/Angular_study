import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {loadUser} from "../store/actions/user.actions";
import {take} from "rxjs";

@Component({
  selector: 'app-dashboard-ngrx',
  template: `
    <p>
      dashboard-ngrx works!
    </p>
  `,
  styles: [
  ]
})
export class DashboardNgrxComponent implements OnInit {

  constructor(private store:Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadUser())

    // Store 的 Subscribe 把所有的结构显示出来
    this.store.pipe(take(1)).subscribe(value=>{
      console.log(value)
    })
  }

}
