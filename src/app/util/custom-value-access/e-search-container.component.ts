import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-e-search-container',
  template: `
  <mat-form-field class='search-form-field' appearance="outline">
    <mat-label>Search</mat-label>
   
 
    <!-- <input  matInput type="text" placeholder="start to type..." name='advanced-search'> -->
    <app-e-search-form  [formControl]='formControl' [required]='true'[placeholder]="'Start to type...'"></app-e-search-form>
  </mat-form-field>

  <style> 
    :host{ 
      display: block;
      margin-left:10rem;
      margin-right: 10rem;

    }

    .search-form-field{
      width: 50%;
    }

  </style>

  `,


})
export class ESearchContainerComponent implements OnInit {

  formControl = new FormControl( {scope: 'at', query:'test'},[Validators.required])

  constructor() { }

  ngOnInit(): void {
  }



}
function AdvancedSearchValidator(control:FormControl){


    
}
