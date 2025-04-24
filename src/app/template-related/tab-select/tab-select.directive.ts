import { Directive } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Directive({
  selector: '[my-tab-select]',
  exportAs:'tabSelect'
})
export class TabSelectDirective {

  private selectedSubject = new BehaviorSubject<string>('overview');
  public selected$ = this.selectedSubject.asObservable();
  constructor() { }
  get selected() {
    return this.selectedSubject.value;
  }

  select(value: string) {
    this.selectedSubject.next(value);
    console.log("changedSelected "+ value)

  }
}
