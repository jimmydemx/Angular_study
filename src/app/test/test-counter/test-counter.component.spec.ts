import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { take, toArray } from 'rxjs';
import { TestCounterComponent } from './test-counter.component';
import * as _ from './test-counter.spec-help'

describe('TestCounterComponent', () => {
  let component: TestCounterComponent;
  let fixture: ComponentFixture<TestCounterComponent>;
  let debugELement: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCounterComponent);
    component = fixture.componentInstance;

    // Note: assigning Input, ngOnChanges or other hooks must be called MANUALLY,
    component.startCount=10;
    component.ngOnChanges();
    fixture.detectChanges();
    debugELement= fixture.debugElement;

  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("increments the count",()=>{
    // Note: get HTML Element: Test Bed -> fixture -> debugElement -> query -> event: triggerEventHandler("event", parameter)
    // parameter=null: no parameter passed
    const incremetButton = debugELement.query(By.css('[data-testid="increment-button"]'))
    incremetButton.triggerEventHandler('click',null)
    // Note: it is important to add  fixture.detectChanges(); after any DOM manipulation
    fixture.detectChanges();
    // above is the act, after clicking the test in  <strong data-testid="count">{{ count }}</strong> will increase by 1;
    // Note: to check the testContent, only nativeElement can be used, debugElement doesn't have textContent
    const countOutput = debugELement.query(
      By.css('[data-testid="count"]')
    );
      expect(countOutput.nativeElement.textContent).toBe('1');
  })

  it('decrements the count',()=>{
    const decrementButton = debugELement.query(
      By.css('[data-testid="decrement-button"]')
      )
      decrementButton.triggerEventHandler('click',null);
      fixture.detectChanges();

      const countOutput = debugELement.query(
        By.css('[data-testid="count"]')
      )

      expect(countOutput.nativeElement.textContent).toBe('-1');
  })


  // use spec-help function
  it("reset the count",()=>{

    const newCount = '123';
    _.setFieldValue(fixture,'reset-input',newCount);
    _.click(fixture,'reset-button');
    fixture.detectChanges();    
    _.expectText(fixture,'count', newCount)
  })

  // not use spec-help function
  it("doesnt not reset if the value is not a number",()=>{
      const value='not a number';
      // value to input : get the input=> assign value => dispatch input event=> click event => expect the textContent
      const resetInput = debugELement.query(By.css('[data-testid="reset-input"]'))  
      resetInput.nativeElement.value = value;
      const event =document.createEvent('Event');
      event.initEvent('input',true,false);
      resetInput.nativeElement.dispatchEvent(event)

      const click = debugELement.query(By.css('[data-testid="reset-button"]'))
      click.triggerEventHandler('click',null);
      fixture.detectChanges()
      
      const count = component.startCount +''

      const countOutput = debugELement.query(By.css('[data-testid="count"]'));
      expect(countOutput.nativeElement.textContent).toBe(count)

  })


  //------------ seperate output test cases --------------------//

  // test output: click on sth=> it shall evoke the Output, 
  // Note: EventEmitter is a subclass of RxJS Subject, which itself extends RxJS Observable
  it('emits countChange events on increment', ()=>{
    let actualCount : number | undefined;
    component.countChange.subscribe(count=>{
        actualCount = count;
    })
    _.click(fixture,'increment-button')
    const count = component.startCount
    // Note: never put the expect inside a subscribe, in case the Observable its broken, it will never enter the sbuscribe
    expect(actualCount).toBe(count+1);
  })



  
  it('emits countChange events on decrease', ()=>{
    let actualCount : number | undefined;
    component.countChange.subscribe(count=>{
      actualCount = count;
    })
    _.click(fixture, "decrement-button");
    const count = component.startCount
    expect(actualCount).toBe(count-1);
  })

   //------------ end: seperate output test cases --------------------//



  // ------------- joint output test case --------------//
  // Note: since the test are repetitive test, we can combine all the test in test by do increase/decrease/input in sequential
  // then use take(3) from the Observales

  it('emit all countChnage events correctly', ()=>{

      const newCount = 123;
      let countArray: Array<number| never>=[]
      component.countChange.pipe(take(3), toArray()).subscribe(counts=>{
        countArray = counts
      })
      _.click(fixture, 'increment-button')
      _.click(fixture, 'decrement-button')
      _.setFieldValue(fixture, 'reset-input', String(newCount));
      _.click(fixture, 'reset-button')
      const count = component.startCount
      expect(countArray).toBe([count+1,count-1,newCount])
  })

    // ------------- end: joint output test case --------------//

    // -------------




  it('emits counterChange events',()=>{
     const newCount = 123;
     let actualCount : number[] | undefined;
     component.countChange.pipe(
         take(3),
         toArray()
     )





  })
});


