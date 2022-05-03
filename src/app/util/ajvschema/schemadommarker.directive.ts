import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2, SimpleChanges } from '@angular/core';
import { AceEditorComponent } from 'ng2-ace-editor';
import {  debounceTime, fromEvent, map, } from 'rxjs'


export interface ErrorMessage{
  index:string;
  errormsg:string;
}

@Directive({
  selector: '[appSchemadommarker]'
})
export class SchemadommarkerDirective {

  @Input('appSchemadommarker') schemaErrors!:Array<any>

  @Output() tabSelected=new EventEmitter();

  public FilteredErrors:Array<ErrorMessage>=[];

  // @HostBinding('class.ace_line') lines!:ElementRef

  constructor(private el:ElementRef, private comp:AceEditorComponent,private rd2:Renderer2) { 

    fromEvent(this.el.nativeElement,'click').pipe(map((val)=>
      document.querySelector('textarea')?.blur(),
    ),debounceTime(100),map(val=>document.querySelector('textarea')?.focus())

    ).subscribe(val=>console.log)
  }


  ngOnChanges(changes: SimpleChanges): void{
    this.FilteredErrors=[];

    console.log("changes:",this.schemaErrors,changes)
    var InsertErrors=this.schemaErrors?.
    map(item=>{
      // instancePath empty
      if(item.instancePath?.length==0){
          if(item?.keyword=='additionalProperties'){
            return {index:item?.params?.additionalProperty, errormsg:item.message +": "+item?.params?.additionalProperty }
          }
          if(item?.keyword=="required"){
            this.FilteredErrors.push({index:'', errormsg:item.message})
          }
          // 0: {instancePath: '', schemaPath: '#/then/required', keyword: 'required', params: {…}, message: "must have required property 'feedback'"}
          // 1: {instancePath: '', schemaPath: '#/if', keyword: 'if', params: {…}, message: 'must match "then" schema'}
          // 2: {instancePath: '', schemaPath: '#/required', keyword: 'required', params: {…}, message: "must have required property 'interval'"}

      }
      // instancePath not empty

        return { index:item?.instancePath?.split("/")?.slice(-1)[0],errormsg: item?.keyword+' '+item?.message}
      
       

    })

    console.log("insertErrors",InsertErrors);

    console.log(document.getElementsByClassName('ace_text-layer')[0])
    
   
    var c = this.el.nativeElement.getElementsByClassName('ace_text-layer')[0];


    console.log('c',c)

    
    setTimeout(() => {
  
      Array.from(this.el.nativeElement.querySelector('div.ace_layer.ace_text-layer').children)?.forEach((item:any)=>{

        this.rd2.removeAttribute(item,"errmsg")
        this.rd2.removeClass(item,'err')
        

        // console.log('123',item,item.textContent.toString().replace(/"(.*)":.*/,"$1"),item.textContent.toString().replace(/"(.*)":.*/,"$1".length)
        // )
        InsertErrors?.forEach(inserterrors=>{
          // debugger;
          // console.log(inserterrors.index,inserterrors.index.length
          //   ,item.textContent.replace(/\W*(\w*)\W*:.*/,"$1"),
          //    item.textContent.replace(/\W*(\w*)\W*:.*/,"$1").length
          //   ,inserterrors.index==item.textContent.replace(/\W*(\w*)\W*:.*/,"$1"))
          if(inserterrors.index==item.textContent.replace(/\W*(\w*)\W*:.*/,"$1")){

            this.FilteredErrors.push({index:inserterrors.index,errormsg:inserterrors.errormsg})

            this.rd2.addClass(item, "err")
            // this.rd2.setAttribute(item,'errmsg',inserterrors.errormsg)
         
            

            // const div = this.rd2.createElement('div');
            // this.rd2.addClass(div,'errmesg')
            // const text = this.rd2.createText('child node')
            // this.rd2.appendChild(div, text);
            // this.rd2.insertBefore(this.rd2.parentNode(item), div, item)
            console.log("added",item)
          }
        })
      })

      this.tabSelected.emit(this.FilteredErrors);

      
    }, 1000);
  }

  ngafterviewinit(){

  

  }


}
