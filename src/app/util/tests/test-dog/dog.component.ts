import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, DOG } from 'src/app/shared/services/api.service';

@Component({
  selector: 'test-dog',
  template: `
   <img *ngIf="dog$ | async as dog" [src]='dog.message'>
  `,
  styles: [
  ]
})
export class TestDogComponent implements OnInit {

  public dog$: Observable<DOG>

  constructor(private api:ApiService) {

    this.dog$ = this.api.GetRandomDog()
   }

  ngOnInit(): void {
  }

}
