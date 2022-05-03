import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appDirec]'
})
export class DirecDirective {


  
  @Input('appDirec') directive!:any;
  constructor() {

    console.log('directive constructor')
   }

  ngOnChanges(){

    console.log('directive Onchanges')

  }

  ngOnInit(){
    console.log('directive Init')
  }

}
