import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tests',
  template: `
      <div [formGroup]='form'>
      <span> username </span>
      <input type="text" id="username-input" formControlName="username">

      <span> password </span>
      <input type="password" id="password-input" formControlName='password'>

      <button id="login-button" (click)="OnSubmit()" [disabled]="disableButtonA || disableButtonB">Submit</button>
      </div>


  `,
  styles: [
  ]
})
export class TestsComponent implements OnInit {

  constructor() { }
  @Output() login: EventEmitter<any> = new EventEmitter();
  public form!:FormGroup
  public disableButtonA=true;
  public disableButtonB=true;
  public username!:string;
  public password!:string;

  ngOnInit(): void {
    this.form = new FormGroup({
      username:  new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
    })
    
  
    this.form.get("username")?.valueChanges.subscribe({
      next: val=>{
        if(val.length==0){
          this.disableButtonA=true;
        }else{
          this.disableButtonA=false;
        }
        this.username = val;
      }
    })

    this.form.get("password")?.valueChanges.subscribe({
      next: val=>{
        console.log(val)
        if(val.length==0){
          this.disableButtonB=true;
        }else{
          this.disableButtonB=false;
        }
        this.password =val;
      }
    })

    
  }

  OnSubmit(){
    console.log({username:this.username,password:this.password})
    this.login.emit({username:this.username,password:this.password})

  }


  // validate(c:FormControl):{[key:string]:any}| null{
  //     if(!c.value)
  //     return null

  //     const pattern =/^j.*$/;
  //     if(pattern.test(c.value)){
  //       this.error =null;
  //       return null;
  //     }
      
  //     console.log("there is errors");
  //      this.error = {

  //       emailNotValid : 'the email must start with j_'
  //     }

  //     return {

  //       emailNotValid : 'the email must start with j_'
  //     }



      
  // }

}
