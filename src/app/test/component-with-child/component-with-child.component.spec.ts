import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentWithChildComponent } from './component-with-child.component';

describe('ComponentWithChildComponent', () => {
  let component: ComponentWithChildComponent;
  let fixture: ComponentFixture<ComponentWithChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentWithChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentWithChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
