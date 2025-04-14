import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponentComponent } from './counter-component.component';
import {FormsModule} from "@angular/forms";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('CounterComponentComponent', () => {
  let component: CounterComponentComponent;
  let fixture: ComponentFixture<CounterComponentComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterComponentComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase count when button is clicked',()=>{
    const button = debugElement.query(By.css('[data-testid="increment-button"]'))
    button.triggerEventHandler('click',null);
    const countOutput = debugElement.query(
      By.css('[data-testid="count"]')
    );
    fixture.detectChanges();
    expect(countOutput.nativeElement.textContent).toBe("1");
  })

  it('should increase count when button is clicked again',()=>{
    const button = fixture.nativeElement.querySelector("button")
    button.click();
    const countOutput = fixture.nativeElement.querySelector(".count")
    fixture.detectChanges();
    expect(countOutput.textContent).toBe("1");
  })

  /**
   * 使用[value]=count，可以直接使用 button.click();
   */

  it('increase count also  with value input ',()=> {
    const button = fixture.nativeElement.querySelector("button")
    button.click();
    const countOutput =  fixture.nativeElement.querySelector(
      '[data-value-testid="count"]'
    );
    fixture.detectChanges();
    expect(countOutput.value).toBe("1")
  })

  /**
   *  使用FormControl 必须使用triggerEventHandler进行触发；
   *  如果直接使用button.click();不会触发得到的值为初始值""
   *  同时需要注意import:FormsModule
   */
  it('increase count also  with form Control input ',()=> {
    const button = fixture.nativeElement.querySelector("button")
    // button.click();
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
    const countOutput =  fixture.nativeElement.querySelector(
      '[data-form-testid="count"]'
    );
    fixture.detectChanges();
    expect(countOutput.value).toBe("1")
  })
});
