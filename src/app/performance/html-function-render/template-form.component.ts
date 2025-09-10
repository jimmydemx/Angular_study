import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-template-form',
  template: `
<!--    <h2>方式 A: 直接 form.get()</h2>-->
<!--    <div *ngFor="let p of products">-->
<!--      <span>ID: {{ getId(p)?.value }}</span> |-->
<!--      <span>Name: {{ p.get('name')?.value }}</span>-->
<!--    </div>-->

    <h2>方式 B: 使用 ng-template let 变量</h2>
    <ng-container *ngFor="let p of products">
      <ng-template [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="{ $implicit: getId(p), p: p }"></ng-template>
    </ng-container>

    <ng-template #tpl let-id let-p="p">
      <span>ID: {{ id?.value }}</span> |
      <span>Name: {{ p.get('name')?.value }}</span>
    </ng-template>



    <h2>方式 C: 使用property</h2>
    <div *ngFor="let p of products">
      <span>ID: {{ p.controls['id'].value }}</span> |
      <span>Name: {{ p.controls['name'].value }}</span>
    </div>


    <hr />
    <form [formGroup]="products[0]">
      <input type="text"  formControlName="id" placeholder="Edit first product name" />
    </form>


  `,
  styles: [
  ]
})
export class TemplateFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    Object.defineProperty(this.products[0].controls['id'], 'value', {
      get() {
        console.log('value getter called');
        return 'xxx'; // 返回原始值
      }
    });
  }

  form = new FormGroup({
    products: new FormArray([
      new FormGroup({
        id: new FormControl('p1'),
        name: new FormControl('Apple'),
      }),
      new FormGroup({
        id: new FormControl('p2'),
        name: new FormControl('Banana'),
      }),
    ]),
  });

  products = (this.form.get('products') as FormArray).controls as FormGroup[];



  getId(fg: FormGroup) {
    console.log('get(id) called for', fg.value.name);
    return fg.get('id');
  }



}
