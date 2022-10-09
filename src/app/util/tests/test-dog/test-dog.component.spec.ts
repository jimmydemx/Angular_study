import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DOG } from 'src/app/shared/services/api.service';

import { TestDogComponent } from './dog.component';


export const mockDog: DOG = {
  message: 
  'https://images.dog.ceo/breeds/hound-basset/n02088238_9815.jpg',
  status: 'success'
};

// describe('TestDogComponent', () => {
//   let component: TestDogComponent;
//   let fixture: ComponentFixture<TestDogComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ TestDogComponent ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TestDogComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
