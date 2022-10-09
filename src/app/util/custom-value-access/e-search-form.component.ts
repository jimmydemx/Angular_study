import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, HostBinding, Input, OnInit, Optional, Self, ViewChild } from '@angular/core';
import {  ControlValueAccessor, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {  Subject, take } from 'rxjs';


export interface FormFiledValue {
  query: string;
  scope: string;
}

export class CustomErrorMatcher implements ErrorStateMatcher{
  isErrorState(control: FormControl): boolean {
      return control.dirty && control.invalid;
  }
}


@Component({
  selector: 'app-e-search-form',
  template: `
  <ng-container [formGroup]='form'>
      <mat-icon matPrefix>search</mat-icon>
        <mat-select class='select' formControlName='scope'>
          <mat-option value="">All</mat-option>
          <mat-option value="at">Austria</mat-option>
          <mat-option value="ua">Ukraine</mat-option>
        </mat-select>
      
        <mat-divider [vertical]="true" class="divider"></mat-divider>

        <input matInput type="text" [ngStyle]="{opacity: disabled? 0.5: 1}"
         formControlName= 'query'
        name='advanced-search' [placeholder]="placeholder" class="input">
  </ng-container>
    <style>


      :host{
        display: flex;
        align-items: center;
        
      }

      .select{
        max-width: 100px;
        margin-left: 0.7rem;
      }

      .divider{
        background-color: black;
        width: 2px;
        height: 1em;
        color: black;
        margin: 0 0.75em;    
      }

      :host::ng-deep.mat-select-value{
        color:black
      }

      :host.floated{

        opacity: 1;
      }
    ::ng-deep .mat-input-element::placeholder{
      color: black;
    }



    </style>
  `,
  providers: [
    { provide: MatFormFieldControl, useExisting: ESearchFormComponent },
    {provide: ErrorStateMatcher, useClass: CustomErrorMatcher}
  ]
})
export class ESearchFormComponent implements OnInit, MatFormFieldControl<FormFiledValue | string>, ControlValueAccessor {


  static nextId = 0;
  stateChanges = new Subject<void>();

  @ViewChild(MatInput, { read: ElementRef, static: true }) input!: ElementRef;

  @Input() set value(value: FormFiledValue) {
    // debugger;
    this.form.patchValue(value)  // directly pass the value to formControl directive
    console.log("scope=",this.form.get("scope")?.value)
    this.stateChanges.next();
  }
  get value() {
    return this.form.value;
  }

  @HostBinding() id = `custom-form-field-id-${ESearchFormComponent.nextId++}`;

  private _placeholder!: string;

  @Input()
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next()
  }
  get placeholder() {
    return this._placeholder;

  }

  focused: boolean = true;


  get empty() {
    return !(this.value as FormFiledValue).query && !(this.value as FormFiledValue).scope;

  }

  @HostBinding('class.floated')
  get shouldLabelFloat(): boolean {
    return true;

  };

  @Input() required!: boolean;
  @Input() disabled!: boolean;
  @Input() errorStateMatcher!: ErrorStateMatcher;

  get errorState(){
    const matcher = this.errorStateMatcher || this.errorMatcher
    return matcher.isErrorState(this.ngControl.control,null);
  }

  controlType = 'custom-form-field';
  // autofilled?: boolean | undefined;

  @HostBinding('attr.aria-describedby') describedby='';
  userAriaDescribedBy?: string | undefined;
  setDescribedByIds(ids: string[]): void {
     this.describedby = ids.join('')
  }
  onContainerClick(event: MouseEvent): void {
    this.focusMonitor.focusVia(this.input, 'program');
    }

  setDisabledState?(isDisabled:boolean):void{

       this.disabled = isDisabled;
       this.form.disable();
       this.stateChanges.next()
  }  


  form!:FormGroup;
  constructor(private focusMonitor: FocusMonitor,@Optional() @Self() public ngControl:NgControl, 
    private fb:FormBuilder, private errorMatcher: ErrorStateMatcher) {

    if(this.ngControl !=null){
       this.ngControl.valueAccessor = this;
    }

   this.form = this.fb.group({
    scope: new FormControl(''),
    query: new FormControl('')
    }) 

    console.log('ngControl',this.ngControl);
    

  }


  onChange!: (value:FormFiledValue)=>void;
  onToutch!: ()=>void;

  // 下面这些，如果有FormControlDirective应该会在afterNgViewinit 就会完成
  writeValue(obj: FormFiledValue): void {
   this.value = obj; // 把new formControl.value 传递给当前组件的value, 当然value也接受app-e-search-container传递过来的值
   console.log('write value',obj)
  }
  registerOnChange(fn: any): void {
    this.onChange= fn; // 默认把(newValue: any) => {control.setValue(newValue, {emitModelToViewChange: false} 函数传递给this.OnChange
    // 然后在此class中创建一个listener，在此时刻才会 this.onChange(new value), 把新的值传递给new formControl函数

  }
  registerOnTouched(fn: any): void {
     this.onToutch = fn;  // 
  }

  ngOnInit(): void {

    this.focusMonitor.monitor(this.input).subscribe(
      {
        next: focused => {
          this.focused == !!focused
          this.stateChanges.next()

        }
      }
    )

    this.focusMonitor.monitor(this.input).pipe(take(1)).subscribe(()=>{
      this.onToutch();
      console.log("Search form Value",this.value);
    })

    this.form.valueChanges.subscribe(value=>{this.onChange(value)
      console.log("Search form Value",this.value);
      
    })
  }


  ngOnDestroy() {

    this.focusMonitor.stopMonitoring(this.input);
    this.stateChanges.complete()

  }

}
