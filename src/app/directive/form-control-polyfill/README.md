1, ValueAccessor: 指定什么时候(registerOnchange),以及怎么样写入(writeValue)
2，MyFormControlDirectiveDirective 里面的逻辑把formControl class 连接到ValueAccessor(传递一个callback function到ValueAccessor)
3，因为传递的函数比较固定，所以MyFormControlDirectiveDirective 不用改变，但是ValueAccessor需要经常改变，所以需要用户定义

注意使用useExisting 以及Multi 来控制怎么样创建ValueAccessor的实例


1, 这个formControl结构的目的是什么？ 
- 通过（MyFormControl) 这个Object结构直接控制表单（使用set，patch等方法让表单改变值），表单的交互也可以反应到MyFormControl上。

2, 为什么需要有abstract Control?

3, 是怎么样把表单，MyFormControl统一的？
- 定义一个MyFormControl在template上，同时传递给FormControlDirective 以及ControlValueAccessor (使用@Directive({
  selector: '[MyFormControl]'}) )
- 通过依赖注入让FormControlDirective直接能够访问ControlValueAccessor

- ControlValueAccessor负责检测template上的变化，并且决定在变化时候怎么样把值给FormControlDirective， 
- 同时传递给FormControlDirective控制MyFormControl的变化,MyFormControl.set()
- 所以实现 input变化->变化值给FormControlDirective的一个函数作为参数-> ,MyFormControl.set 这个值，沟通其表单以及MyFormControl
- 如果当MyFormControl.set值的时候（valueChange)-> set 这个值需要传递给ControlValueAccessor，然后其通过ControlValueAccessor的wirteValue函数写入表单
