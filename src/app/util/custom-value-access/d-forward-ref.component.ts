import { Component, forwardRef, OnInit } from '@angular/core';
import { BRIDGE } from './value.token';

const  FWord = {
  provide:BRIDGE, 
  useExisting:forwardRef(()=>DForwardRefComponent) 
}

@Component({
  selector: 'app-d-forward-ref',
  template: `
    <p>
      d-forward-ref works!
    </p>
  `,
  providers:[FWord]
})
export class DForwardRefComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
