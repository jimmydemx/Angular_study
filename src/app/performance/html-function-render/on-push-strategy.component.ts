import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-on-push-strategy',
  template: `
    <h3>方式 1: 直接 form.get()</h3>
    <p>Name: {{ nameValue }}</p>
    <p>Age: {{ form.get('age')?.value }}</p>

    <h3>方式 2: Getter</h3>
    <p>Name: {{ nameControl.value }}</p>

    <h3>方式 3: Async pipe</h3>
    <p>Name: {{ name$ | async }}</p>

    <hr />

    <form [formGroup]="form">
      <input type="text" formControlName="name" placeholder="Edit name">
    </form>

  `,
  styles: [
  ],
  changeDetection:ChangeDetectionStrategy.Default
})
export class OnPushStrategyComponent implements OnInit {

  constructor() { }

  form = new FormGroup({
    name: new FormControl('Alice'),
    age: new FormControl(20),
  });

  // 方式 1：每次模板直接 form.get()
  // 无额外代码

  // 方式 2：getter
  get nameControl(): FormControl {
    console.log('getter evaluated'); // 观测 getter 被调用几次
    return this.form.get('name') as FormControl;
  }
  get nameValue():string{
    console.log("direct get evaluated")
    return this.form.get("name")?.value
  }

  // 方式 3：valueChanges + async pipe
  name$: Observable<any> = this.form.get('name')!.valueChanges.pipe(map((name)=>{
    console.log("async pipe evaluated.")
    return name;
  }));

  ngOnInit(): void {
  }
}


/**
 *  changeDetection:ChangeDetectionStrategy.OnPush
 *  form.get('age')?.value 行为与 使用get 函数 完全一样
 *  使用其它组件button时候 : 不会触发
 *  在unfocus对话框  : 触发一次
 *  在修改时候；触发一次
 *
 *  async:
 *  使用其它组件button时候 : 不会触发
 *  在unfocus对话框  : 不会触发
 *  在修改时候；触发一次
 *
 *  *******************************************************************
 *
 *  changeDetection:ChangeDetectionStrategy.Default
 *   form.get('age')?.value 行为与 使用get 函数 完全一样
 *  使用其它组件button时候 : 触发二次
 *  在unfocus对话框  : 触发二次
 *  在修改时候；触发二次
 *
 *
 * async:
 *  使用其它组件button时候 : 不会触发
 *  在unfocus对话框  : 不会触发
 *  在修改时候；触发一次
 *
 */
