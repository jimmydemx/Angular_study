import {Directive, Inject, Input, OnDestroy, OnInit, Optional, Self} from '@angular/core';
import {MyFormControl} from "./MyFormControl";
import {Subscription} from "rxjs";
import {
  MY_NG_VALUE_ACCESSOR,
  MyControlValueAccessor,
  MyControlValueAccessorDirective
} from "./my-control-value-accessor.directive";

@Directive({
  selector: '[MyFormControl]'
})
export class MyFormControlDirectiveDirective implements  OnInit,OnDestroy{

  @Input("MyFormControl") formControl!:MyFormControl
  private valueSub?:Subscription
  constructor(
    @Optional() @Self() @Inject(MY_NG_VALUE_ACCESSOR) private valueAccessor:MyControlValueAccessor
  ) {

    if(!valueAccessor){
      throw new Error('No ControlValueAccessor found!');
    }
  }

  ngOnDestroy(): void {
  }


  ngOnInit(): void {

    /**
     *  可以看到；此Directive直接和Template相连的，当接收到formControl以后，告知valueAccessor需要执行formControl中SetValue的函数
     *  - formControl.setValue 是一个Observable.next(),会更新formControl.valueChanges 的值
     *  - 对于valueAccessor，其使用Listener对应HTML的变化，也就是决定什么时候更新HTML
     *  最后逻辑就为 当HTML变化->valueAccessor检测到-> formControl SetValue -> formControl.valueChange 检测到
     *  这样就完成了连接 HTML变化以及FormControl这个class
     */

    this.valueAccessor.registerOnChange((value:any)=>{
      this.formControl.setValue(value);
    })

    this.valueAccessor.registerOnTouched(() => {
      // 可扩展 touched 状态逻辑
    });


    /**
     * 接上面： 当formControl.valueChange 检测到变化以后，需要把其值重新写到html之中
     * 这个代码是必须的，因为当我们以编程方式改变表单值时，我们需要同步这些值到 UI 控件中。比如this.formControl.setValue('hello');
     * 如果不调用 writeValue()，input 不会更新显示
     */

    // 监听 formControl 的变更，写回组件
    this.valueSub = this.formControl.valueChanges.subscribe(value => {
      this.valueAccessor.writeValue(value);
    });


    // 初始化写入当前值
    this.valueAccessor.writeValue(this.formControl.value);
  }

}
