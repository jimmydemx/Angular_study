import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestChild1Component } from './test-child1/test-child1.component';
import { TestComponent } from './test.component';
import {MockComponent} from 'ng-mocks';

// describe('TestComponent with ng-mocks', () => {
//   let component: TestComponent;
//   let fixture: ComponentFixture<TestComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ TestComponent],
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(TestComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


//--------------fake child component with manual made fake component ----------//

/**
 * Note: fake Child component shall have the same selector as the real one
 * parent component will search based on the selector, so it will find fakeChild Component
 */ 
@Component({
  selector:"app-test-child",
  template:'<p></p>',
})class FakeTestChild1Component implements Partial<TestChild1Component>{
  @Input() familyString: string = '';
  @Output() eatTogether?: EventEmitter<any> = new EventEmitter();
}


// Note:NO_ERRORS_SCHEMA is 
describe('Test Without ng-mocks', ()=>{

  let fixture:ComponentFixture<TestComponent>;
  let component:TestComponent;
  let TestChild1:FakeTestChild1Component

  // treat TestBed as NgModule
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations:[TestComponent, FakeTestChild1Component],
      schemas:[NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture= TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  
    // Note: FakeTestChild1Component has selector app-test-child1, so it can by find By.directive
  
    const TestChild1EL= fixture.debugElement.query(
      By.directive(FakeTestChild1Component)
    )
    TestChild1 = TestChild1EL.componentInstance;
  })




  // start the test 
  it('renders an independent component',()=>{
    expect(component).toBeTruthy();
  })


})
