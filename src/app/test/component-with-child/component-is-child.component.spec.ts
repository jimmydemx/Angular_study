import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ComponentIsChildComponent} from "./component-is-child.component";

describe('ComponentIsChildComponent', () => {
  let component: ComponentIsChildComponent;
  let fixture: ComponentFixture<ComponentIsChildComponent>;
  let       updateMessage :string;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentIsChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentIsChildComponent);
    component = fixture.componentInstance;
    component.initialInputButtonName ="text button"
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it("shows the text of start button",()=>{
    const button  = fixture.nativeElement.querySelector('button');
    expect(button.textContent?.trim()).toBe("text button")
  })

  /**
   * 测试Output之需要使用1，subscribe 2，触发Output 3 expect值
   */
  it('emit updateMessage on click the button',()=>{
    component.updateMessage.subscribe(message=>{
      updateMessage = message;
    })
    const button  = fixture.nativeElement.querySelector('button');
    button.click();

    expect(updateMessage).toBe("this is message from child");
  })


});
