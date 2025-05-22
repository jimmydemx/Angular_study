import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChild1Component } from './test-child1.component';

describe('TestChild1Component', () => {
  let component: TestChild1Component;
  let fixture: ComponentFixture<TestChild1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestChild1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestChild1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
