import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Ajv from 'ajv'
import { schema } from './schema.file';

@Component({
  selector: 'app-ajvschema',
  template: `
    <style>
    </style>
  `,
  styles: [
  ]
})
export class AjvschemaComponent implements OnInit {

private _data!:any


@Input() set data(newval){
      this._data=newval
      this.validator(newval)
  }
  get data(){
    return this._data;
  };


  @Output() err = new EventEmitter();


  constructor() { }

  ngOnInit(): void {    
  }
  
   validator(data:any){
      const ajv = new Ajv({allErrors: true})
      const validate = ajv.compile(schema)

      const valid = validate(data)
      console.log("valid",valid);
      if (!valid) {
        this.err.emit(validate.errors);
        console.log(validate.errors)
      }
    }
}

