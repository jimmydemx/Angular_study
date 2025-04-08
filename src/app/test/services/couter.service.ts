import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';


// Note: this is a service without Any Dependency
@Injectable({
  providedIn: 'root'
})
export class CouterService {

 // Technically, this property is not necessary since the BehaviorSubject
  // below already holds the current count. We are keeping it for clarity.
  // private count = 0;

  private subject: BehaviorSubject<number> = new BehaviorSubject<number>(0);


  // Every BehaviorSubject is an Observable and Observer.
  // We do not want to expose the Observer trait to the outside,
  // so we downcast the BehaviorSubject to a simple Observable only.
  public getCount(): Observable<number> {
    return this.subject.asObservable();
  }

  public increment(): void {
    // this.count++;
    this.subject.next(this.subject.value+1)

  }

  public decrement(): void {
    // this.count--;
    this.subject.next(this.subject.value-1)
  }

  public reset(newCount: number): void {
    // this.count = newCount;
    this.subject.next(newCount);
  }

  // private notify(): void {
  //   this.subject.next(this.count);
  // }

  public complete(): void {
    this.subject.complete();
  }
}
