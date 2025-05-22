import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentWithSpyComponent } from './component-with-spy.component';
import {ComponentWithSpyServiceService} from "./component-with-spy-service.service";

describe('ComponentWithSpyComponent', () => {
  let component: ComponentWithSpyComponent;
  let fixture: ComponentFixture<ComponentWithSpyComponent>;
  let service: ComponentWithSpyServiceService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentWithSpyComponent ],
      providers:[ComponentWithSpyServiceService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentWithSpyComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ComponentWithSpyServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shall call componentWithSpyService.show message',()=>{
    const spy = spyOn(service,'getMessage').and.returnValue("this is mock message");
    component.onShowMessage();
    expect(spy).toHaveBeenCalled();
    expect(component.message).toBe("this is mock message")

  })
});
