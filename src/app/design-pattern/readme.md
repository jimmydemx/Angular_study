"解耦"（Decouple）思想是提高代码`可维护性`、`可扩展性`和`可测试性`的关键。

# 1，识别耦合点
> - 一个模块`直接`修改另一个模块的内部状态 
> - 类A需要知道类B的`内部`实现才能调用 
> - 类A知道类B中的属性或者方法
> - 修改一个模块会导致`连锁修改` 
> - 难以`单独测试`某个组件


# 2.Angular架构举例：

## 2.1 依赖注入
```typescript
class A {
  constructor(private b:B) {
    b.getSomething()
  }
}
```
Angular中的依赖注入而不是直接使用new B()进行实例化的原因：
- 不需要知道具体怎么样B的`细节`(new B(c:C,d:D,e:E))
- 但是在class A 中还是需要了解Class B的细节，因为调用了B的方法
- 修改B会导致A的修改
- 必须要模拟B才能测试A


## 2.2 事件驱动

```typescript
import {Observable} from "rxjs";

const observable= new Observable({
  
})

obsevable.subscsribe()
subject.next()
```

如果一个模块A专注于publish，另外B模块关注于subscribe，
- A模块不会关注B模块，在细节方面解偶
- A可能只是依赖B的类型，当然对于使用Typescript可以减少这样在runtime的影响
- 测试B需要模拟A

## 2.3 中间件

```typescript
class ModuleA {
  constructor(private b: B, private c: C, private d: D, private e: E) {
    b.method();
    c.method();
    d.method();
    e.method();
  }
}

//----------- 改进----------//
class ModuleB {
  constructor(private b: B, private c: C, private d: D, private e: E) {
    b.method();
    c.method();
    d.method();
    e.method();
  }
}

class ModuleA {
  constructor(private moduleB:ModuleB) {
  }
}
```
这样ModuleA还是和b,c,d,e 有耦合，如果想把其和b,c,d,e进行进一步解偶，可以创建另一个模块


## 2.4 策略模式以及injection解偶
```typescript
//----策略模式就是将使用方法以及方法本身分离，方法本身容易扩展。使用方法知道怎么样调用方法------//
// 定义interface来约束不同Strategy中的方法
interface Strategy {
  execute(data: any): any;
}
class StrategyA implements Strategy {...}
class StrategyB implements Strategy {...}

// 然后容易选择不同的方法，根据上下文
// class Context {
constructor(private strategy: Strategy) {}
}
//------------------在Angular中--------------------//
export interface ValidationStrategy {
  validate(value: string): boolean;
}
@Injectable()
export class EmailValidationStrategy implements ValidationStrategy {
  validate(value: string): boolean {
    return /\S+@\S+\.\S+/.test(value);
  }
}

@Injectable()
export class PhoneValidationStrategy implements ValidationStrategy {
  validate(value: string): boolean {
    return /^\d{11}$/.test(value);
  }
}
// 下面定义InjectionToken
export const VALIDATION_STRATEGIES = new InjectionToken<ValidationStrategy[]>('VALIDATION_STRATEGIES');

// 注册此InjectionToken
@NgModule({
  providers: [
    { provide: VALIDATION_STRATEGIES, useClass: EmailValidationStrategy, multi: true },
    { provide: VALIDATION_STRATEGIES, useClass: PhoneValidationStrategy, multi: true },
  ]
})
export class AppModule {}

// 使用
@Injectable()
export class ValidatorService {
  constructor(@Inject(VALIDATION_STRATEGIES) private strategies: ValidationStrategy[]) {}

  validate(value: string): boolean {
    return this.strategies.some(s => s.validate(value));
  }
}
// 动态切换

@Injectable()
export class DynamicValidatorService {
  private currentStrategy!: ValidationStrategy;

  constructor(@Inject(VALIDATION_STRATEGIES) private strategies: ValidationStrategy[]) {}

  use(strategyType: 'email' | 'phone') {
    this.currentStrategy = this.strategies.find(s => s instanceof EmailValidationStrategy && strategyType === 'email')
      ?? this.strategies.find(s => s instanceof PhoneValidationStrategy);
  }

  validate(value: string) {
    return this.currentStrategy?.validate(value);
  }
}
```

使用场景：
- 导出 PDF，Excel，CSV等不同逻辑
- 不同role的不同行为策略，比如访问限制
- 游戏策略，多种敌人行为实现一套通用接口

策略模式分析：
> - 使用策略模块只是使用其策略，没有直接修改策略
> - 策略模块必须知道策略中的方法，但是只是对于接口有了解，算是一种合理耦合
> - 修改一个借口会导致`所有模块进行修改`
> - 容易扩展方法
> - 容易测试使用策略组件组件以及策略组件


如果希望使用方根本不用知道策略细节，也不依赖策略接口，可以考虑进一步解耦(增加一个中间层)
```typescript
interface PaymentContext {
  type: 'alipay' | 'creditcard' | 'paypal';
  amount: number;
  currency: string;
  metadata?: any;
}

// 策略接口改为基于上下文处理
export interface PaymentStrategy {
  canHandle(context: PaymentContext): boolean;
  execute(context: PaymentContext): void;
}

@Injectable()
export class AlipayStrategy implements PaymentStrategy {
  canHandle(context: PaymentContext): boolean {
    return context.type === 'alipay';
  }

  execute(context: PaymentContext): void {
    console.log(`使用支付宝支付: ${context.amount} ${context.currency}`);
  }
}

@Injectable()
export class CreditCardStrategy implements PaymentStrategy {
  canHandle(context: PaymentContext): boolean {
    return context.type === 'creditcard';
  }

  execute(context: PaymentContext): void {
    console.log(`信用卡支付: ${context.amount} ${context.currency}`);
  }
}

// 增加中间层，Dispatcher，使用者只传context，就不知道原来的策略中室友有execute或者handle方法
// @Injectable({ providedIn: 'root' })
export class PaymentDispatcher {
  constructor(@Inject(PAYMENT_STRATEGIES) private strategies: PaymentStrategy[]) {}

  dispatch(context: PaymentContext) {
    const handler = this.strategies.find(s => s.canHandle(context));
    if (!handler) {
      throw new Error(`No strategy found for type: ${context.type}`);
    }
    handler.execute(context);
  }
}

// 使用
@Component({ /*...*/ })
export class CheckoutComponent {
  constructor(private dispatcher: PaymentDispatcher) {}

  payWithPaypal() {
    this.dispatcher.dispatch({
      type: 'paypal',
      amount: 100,
      currency: 'USD',
    });
  }

  payWithCreditCard() {
    this.dispatcher.dispatch({
      type: 'creditcard',
      amount: 80,
      currency: 'EUR',
    });
  }
}
```
这样可以解偶策略和使用策略，但是中间层和策略有一定耦合
- Dispatcher 依赖 Strategy 接口： 算是合理耦合
- Dispatcher 不依赖每个具体策略类 没有耦合
- 具体策略需要 context 格式	数据结构耦合，算是合理耦合

还有一个问题。这样设计会不会使得Dispatch太`中心化`了？
```typescript
// 改为这样 
// 然后 组册自己的dispatcher
@Injectable()
export class PaymentDispatcher<T> {
  constructor(
    @Inject('STRATEGIES') private strategies: Strategy<T>[]
  ) {}

  dispatch(context: T) {
    // ...
  }
}
// 在PaymentModule中只使用

@NgModule({
  providers: [
    { provide: 'STRATEGIES', useClass: PaypalStrategy, multi: true },
    { provide: 'STRATEGIES', useClass: AlipayStrategy, multi: true },
    { provide: Dispatcher, useClass: PaymentDispatcher }, // 泛型策略调度器
  ]
})
export class PaymentModule {}


```

可能存在过度设计了， 
`过度设计`和`合理抽象`之间找到`平衡点`，根据`项目实际复杂度`来决定解耦程度。


## 2.5 bridge

| 模式 | 核心点 | 关键词 | Angular 中应用 |
|-----|-----|-----|----|
| Strategy | “动态选择行为” | 策略行为 + 上下文传参 | DI + multi-provider，如权限校验、支付逻辑等 |
| Bridge | “结构解耦多维变化” | 抽象 + 实现 分离 | 渲染引擎、导出平台适配器、多租户主题系统等 |




# 3. 其它问题
## 3.1 使用集中处理还是使用多态方式
 - 有一个 ParentComponent 定义了一些默认行为
- 多个 ChildComponent1 / 2 / 3... 继承它
问题：某些 child 需要 override 某些方法还是使用service进行判断isntancof 进行集中管理

推荐使用`继承 + 多态`
- 职责清晰：子组件的行为与自身绑定
- 符合 OOP 原则：遵守开放封闭原则（对扩展开放，对修改封闭）
- 没有额外判断逻辑：不需要额外判断 instanceof，减少出错空间
- 方便维护和测试：每个子组件逻辑都可单独测试和维护

不推荐方式：Service 中使用 instanceof判断

- 严重破坏封装：service 需要知道所有的子类 
- 违背开闭原则：每次增加新子类都要修改 service
测试困难：service 的依赖变得复杂

但是`继承 + 多态`可能会遗漏重些方法，现在能够找到的解决方法是：
```typescript
export abstract class BaseExportComponent<T = any> {

  onExportClick(): void {
    const data = this.collectData();        // 子类必须实现
    const payload = this.formatData(data);  // 可选 override
    this.export(payload);                   // 固定逻辑
  }

  /** 必须由子类实现 */
  protected abstract collectData(): T;

  /** 子类可 override */
  protected formatData(data: T): any {
    return {
      timestamp: Date.now(),
      data,
    };
  }

  /** 固定导出逻辑，不可 override */
  private export(payload: any): void {
    console.log('Exporting...', JSON.stringify(payload));
    // 或上传到服务器、下载文件等
  }
}


// 在子元素中
export abstract class BaseExportComponent<T = any> {

  onExportClick(): void {
    const data = this.collectData();        // 子类必须实现
    const payload = this.formatData(data);  // 可选 override
    this.export(payload);                   // 固定逻辑
  }

  /** 必须由子类实现 */
  protected abstract collectData(): T;

  /** 子类可 override */
  protected formatData(data: T): any {
    return {
      timestamp: Date.now(),
      data,
    };
  }

  /** 固定导出逻辑，不可 override */
  private export(payload: any): void {
    console.log('Exporting...', JSON.stringify(payload));
    // 或上传到服务器、下载文件等
  }
}

```

- 强制性实现：abstract 可以防止开发者遗漏必要逻辑
- 灵活性控制：模板方法模式可以保留默认行为
- 解耦流程：调用者无需关心每个步骤的细节，只负责调 onExportClick

所以对于
> 我们想要导出报表，但可能有 多个数据来源（DataSource） 和 多个导出格式（Exporter）

需要考虑，如果多个exporter，是否需要考虑是否使用strategy模式？ 然后对于每个exporter是否有多态，是否需要有抽象类？


## 3.2 使用service(private BehaviorSubject+ public BehaviorSubject as Observable) 如果使用在组件中，最好是希望不在在component中next，有什么解决方法?

```typescript
// 方案一：暴露语义化的 API 方法（推荐）
@Injectable({ providedIn: 'root' })
export class CounterService {
  private counter$ = new BehaviorSubject<number>(0);
  readonly counter = this.counter$.asObservable();

  increment() {
    const current = this.counter$.value;
    this.counter$.next(current + 1);
  }

  reset(to = 0) {
    this.counter$.next(to);
  }
}

@Component({ ... })
export class MyComponent {
  counter$ = this.counterService.counter;

  constructor(private counterService: CounterService) {}

  onAddClick() {
    this.counterService.increment(); // 明确语义，组件无需处理细节
  }

  onResetClick() {
    this.counterService.reset(); // 更清晰
  }
}

// 组件“声明式”调用 service，无需知道内部实现。

// 更容易测试和维护（mock service 只看方法调用）。



//方案二： 类似 NgRx 的思想（事件驱动 -> 响应副作用），增加一个中间层
enum EventType {
  INCREMENT = 'INCREMENT',
  RESET = 'RESET',
}

@Injectable({ providedIn: 'root' })
export class ActionBusService {
  private action$ = new Subject<EventType>();

  public readonly actions = this.action$.asObservable();

  emitAction(action: EventType) {
    this.action$.next(action);
  }
}

this.actionBus.actions.pipe(
  filter(action => action === EventType.INCREMENT)
).subscribe(() => this.incrementCounter());



```

