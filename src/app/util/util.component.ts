import { Component, ContentChildren, ElementRef, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { AceEditorComponent } from 'ng2-ace-editor';
import { AjvschemaComponent } from './ajvschema/ajvschema.component';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import * as ace from "ace-builds";
import { ErrorMessage } from './ajvschema/schemadommarker.directive';

@Component({
  selector: 'app-util',
  templateUrl: './util.component.html',
  styleUrls: ['./util.component.scss'],
  providers:[{provide:AceEditorComponent,useExisting:AceEditorComponent}]
})
export class UtilComponent implements OnInit {
  public errmsg!:string;
  public RetrivedErrorArray:Array<ErrorMessage>=[];
  public data!:any 
  public data_json!:any
  public shemaErrors!:Array<any>;
  public omittedErrMsg!:string;
  form!:FormControl;
  // @ViewChild('aceEditor') aceEditorComp!:AceEditorComponent
  @ViewChild('aceEditor',{read:ElementRef})aceEditor!:ElementRef


  constructor(private rd2:Renderer2) { 
 
    this.data_json = JSON.stringify(this.data,null,2);

  };

    // this.data_json=JSON.stringify(this.data,null,2);

  

  // @ViewChild('schema')AjvSchema!:AjvschemaComponent;

  ngOnInit(): void {

    this.data= {
      Has_persistence:true,
      variablesListName:123,
      unique:123,
      state:111,
      afe:1,
      fef:12321,
      retePosition:[
        "13123",
        "dw",
        123
      ],
      persistence:{
        ffe:123
      }

    }
    this.data_json = JSON.stringify(this.data,null,2);
    console.log(this.data_json)

    // this.form = new FormControl(JSON.stringify(this.data,null,2))
  
  }

  ngAfterViewInit(){

    var aceEditor =ace.edit(this.aceEditor.nativeElement);
    aceEditor.on('focus',($event)=>{


    var aceEditor =ace.edit(this.aceEditor.nativeElement);

    
    // var selectionRange = aceEditor.getSelectionRange();
    // var endLine = selectionRange.end.row;
    // var startLine = selectionRange.start.row;
     var row = (aceEditor.getSelection() as any).anchor.row;
    var ele= aceEditor.renderer.getMouseEventTarget() 
     var content = aceEditor.session.getLine(row); // content

     //content parse

     var content_parse = content.replace(/\W*(\w*)\W*:.*/,"$1")

   
      // get the current error Array
      console.log('4141241',this.RetrivedErrorArray.find(item=>item.index==content_parse))
      if(this.RetrivedErrorArray){
        this.errmsg=this.RetrivedErrorArray.filter(item=>item.index==content_parse)?.map(item=>item.errormsg).join('\n') || ''
      }
      


    
  
    console.log('content',content,row,ele,content_parse)

    // search DOM的

      console.log("change",$event)
    })


 
  // console.log(this.aceEditor.nativeElement.querySelector('.ace_text-layer'))
  // console.log(this.form)

  }

  textChanged($e:any){
    this.data = JSON.parse($e);
    console.log('enters',$e)
  }

  getError($e:Array<any>){
    this.shemaErrors= $e;
    console.log('errors:',$e)
  }
  // ace-editor 

  RetriveErrorMsg(errArray:Array<ErrorMessage>){

    this.RetrivedErrorArray = errArray;
    // for omitted error mesg 
    this.omittedErrMsg = errArray.filter((item:ErrorMessage)=>item.index=='')?.map((item:ErrorMessage)=>item.errormsg)?.join(';<br>') || ''

    console.log('RetrivedErrorArray',errArray);
  }

}
