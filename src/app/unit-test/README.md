- the benefit of end-to-end tests is the highest, however they are unreliable and hard to debug
- unit test is more economic, it might increase the cost of every code change: if lines changes, then some tests can suddenly fail.

# 1. 函数的最佳实践(便于测试)
- 纯函数式: 尽量避免使用全局变量，使用参数传递，使用返回值
- public 以及private的函数要表明清楚，尽量少使用public
- 如果必须有public变量需要使用(template的状态管理)，可以适当使用public变量
- 如果有大量public变量，可以
  - 把各种变量使用一个Object进行管理，避免过于分散
  - 创建一个Service，以及BehaviorObservable进行管理，BehaviorObservable的好处是不会有状态污染，使用public可能会有状态污染

# 2.测试文件最佳⌚️
- 可以编写一个test-helper文件，这样可以把相关函数打包进去


```Typescript
@Component({ ... })
export class ProductComponent {
  // 定义一个Object包括所有状态变化
  public vm = {
    isEditing: false,
    selectedId: null as number | null,
    loading: false,
    products: [] as Product[],
  };

  toggleEdit() {
    this.vm.isEditing = !this.vm.isEditing;
  }
}

//或者最好定义一个service、然后在service中使用BehaviorObservable处理
export class StateService{ 
  readonly vm$ = combineLatest([
    this.loading$,
    this.selectedProduct$,
  ]).pipe(
    map(([loading, selected]) => ({ loading, selected }))
  );
}



```


### write `black box test`, based on the input and output.
- test only calls method that are marked with `public`
- all `internal` methods shall be marked with private.

### test can be infinite, but what kind of tests shall be written?



```angular2html
describe('Suite description', () => {
  beforeAll(() => {
    console.log('Called before all specs are run');
  });
  afterAll(() => {
    console.log('Called after all specs are run');
  });

  beforeEach(() => {
    console.log('Called before each spec is run');
  });
  afterEach(() => {
    console.log('Called after each spec is run');
  });
```

测试不是“越多越好”，而是“覆盖关键行为的最小集合”。

# 2.代码分析以及改进
## 2.1 分析代码的测试点
```typescript
this.selectedDeviceList.valueChanges.subscribe((value) => {
                if (
                    !this.aliasDescriptionControl.aliasEdit ||
                    !this.aliasDescriptionControl.descriptionEdit 
                      // 分析1: 全局变量需要模拟，
                ) {
                    this.selectedDeviceList.setValue(previousDeviceList, {
                        emitEvent: false,
                    }); // 分析2:是formControl，需要重点测试其值的变化，所以需要使用callthrough() 调用原方法
                    const text =
                        "Change is not saved. Do you want to switch device?";
                    this.simpleDialog // 分析3: 注入的，需要进行模拟，而且是Promise，需要使用用 fakeAsync 或 async/await + tick 控制异步
                        .showConfirmDialog({
                            text: text,
                        })
                        .then((result) => {
                            if (result) {
                                this.aliasDescriptionControl.descriptionEdit =
                                    true;
                                previousDeviceList[0].alias =
                                    this.aliasDescriptionControl.aliasPreviousValue;
                                previousDeviceList[0].description =
                                    this.aliasDescriptionControl.descriptionPreviousValue;
                                // 分析4：这些都是全局变量，也是副作用，需要测试
                                this.selectedDeviceList.setValue(value, {
                                    emitEvent: false,
                                });
                                previousDeviceList = value;
                            }
                        })
                        .then(() => {
                            if (
                              //分析5: isDeviceInfoAndConfigLoaded 可以直接被mock，不关注此逻辑内部实现
                              // 但是会出现一个问题，如果在isDeviceInfoAndConfigLoaded也修改了aliasEdit，descriptionEdit
                              // 的状态，那么实际上这是一种不良的设计，而且因为测试的目的是测试subscribe行为所以呢不关心isDeviceInfoAndConfigLoaded实现的细节
                                !this.isDeviceInfoAndConfigLoaded(
                                    this.selectedDeviceList.value[0],
                                )
                            ) {
                                this.loadDeviceInfoAndConfigs(
                                    this.selectedDeviceList.value[0],
                                );
                            }
                        });
                } else {
                    previousDeviceList = value;
                    if (
                        !this.isDeviceInfoAndConfigLoaded(
                            this.selectedDeviceList.value[0],
                        )
                    ) {
                        this.loadDeviceInfoAndConfigs(
                            this.selectedDeviceList.value[0],
                        );
                    }
                }
            })
```

注意

| 用法                                                            | 说明                             |
| ------------------------------------------------------------- | ------------------------------ |
| `spyOn(..., 'loadDeviceInfoAndConfigs')`                      | 创建 spy，不执行原函数，**适合验证是否调用了该函数** |
| `spyOn(..., 'loadDeviceInfoAndConfigs').and.returnValue(...)` | 模拟函数返回值（如 mock API）            |
| `spyOn(..., 'loadDeviceInfoAndConfigs').and.callFake(...)`    | 提供自定义实现                        |
| `spyOn(..., 'loadDeviceInfoAndConfigs').and.callThrough()`    | 执行真实实现，谨慎使用                    |

```typescript
it('should show confirm dialog and restore old value if aliasEdit is false', fakeAsync(() => {
  // 设置 aliasEdit 为 false
  component.aliasDescriptionControl.aliasEdit = false;
  component.aliasDescriptionControl.descriptionEdit = true;
  const oldValue = [{ id: 1, alias: 'old', description: 'desc' }];
  const newValue = [{ id: 2, alias: 'new', description: 'desc' }];
  component.selectedDeviceList.setValue(oldValue); // 重点测试subscribe变化所以使用真实的set

  spyOn(simpleDialogService, 'showConfirmDialog').and.returnValue(Promise.resolve(true));
  spyOn(component, 'loadDeviceInfoAndConfigs'); // 不关心其具体的值。所以直接模拟
  spyOn(component.selectedDeviceList, 'setValue').and.callThrough(); // 监听 setValue 方法的调用，并透传调用原始实现，即不阻断函数逻辑
  //一旦设置了 spy，那么所有后续对 setValue 的调用都会被捕捉和记录

  component.selectedDeviceList.setValue(newValue); // 触发 valueChanges

  tick(); // 等待 Promise 解析

  expect(simpleDialogService.showConfirmDialog).toHaveBeenCalled();
  expect(component.loadDeviceInfoAndConfigs).toHaveBeenCalledWith(newValue[0]);
  expect(component.selectedDeviceList.setValue).toHaveBeenCalledWith(oldValue, { emitEvent: false });
  expect(component.selectedDeviceList.setValue).toHaveBeenCalledWith(newValue, { emitEvent: false });
}));
```

## 2.2 上面代码的缺点与改进
这样做的缺点：
- 在 subscribe 中嵌套了大量业务逻辑、副作用逻辑
- 控制逻辑（can switch?）+ 弹窗交互 + 状态回退 + 数据加载全写在一起
- 表单状态行为与 UI 行为未分离（UI 数据驱动行为）
-component 担负过多职责

改进：
此component`只处理交互事件、绑定 observable，不做复杂判断`
这里副作用有：
- previousDeviceList
- this.aliasDescriptionControle各种专题
将副作用拆分为`职责单一`、`可测试`的 service（例如 Facade、DeviceService 等）正是 Angular 和`大型前端项目中的最佳实践之一`。
- 这种模式的核心思想是：

✅ 把不可预测的副作用抽离出组件，让组件专注处理输入/输出与 UI 渲染，逻辑交由专职服务负责。
🔹1. 降低耦合，让组件变成“纯组件”
   - 组件不再直接管理复杂状态（如 previousDeviceList、aliasEdit）
   - 组件只是绑定服务的数据流 + 转发用户交互（点击、输入等）

🔹 2. 增强可测试性（副作用变“可控”）
- 每个服务都可以被单独单元测试
- 组件只需要 mock 这些服务，测试非常轻量

🔹 3. 更符合 SOLID 原则（尤其是 SRP、DIP）
- 单一职责（SRP）：一个服务做一件事
- 依赖倒置（DIP）：组件依赖的是抽象的接口而非具体逻辑

```typescript
this.selectedDeviceList.valueChanges
  .pipe(
    switchMap(newValue => this.deviceFacade.trySwitchDevice(newValue)) // 抽离到 facade 中
  )
  .subscribe();

// 在facade
@Injectable()
export class DeviceFacadeService {
  private previousDeviceList: Device[] = [];

  constructor(private dialog: SimpleDialogService, private deviceService: DeviceService) {}

  trySwitchDevice(newList: Device[]): Observable<void> {
    if (!this.canSwitch()) {
      return this.dialog
        .showConfirmDialog({ text: 'Unsaved changes. Continue?' })
        .pipe(
          filter(result => result),
          tap(() => {
            this.restorePreviousValues();
            this.previousDeviceList = newList;
            this.deviceService.setDeviceList(newList);
          })
        );
    } else {
      this.previousDeviceList = newList;
      return of(void 0).pipe(
        tap(() => this.deviceService.loadIfNecessary(newList[0]))
      );
    }
  }

  private canSwitch(): boolean {
    // 抽出判断逻辑
    return this.deviceService.isAliasSaved();
  }

  private restorePreviousValues() {
    this.deviceService.restoreAlias();
    this.deviceService.setDeviceList(this.previousDeviceList);
  }
}


// facade只需要测试
it('should restore and allow switch if alias is not saved and user confirms', () => {
  dialog.showConfirmDialog.and.returnValue(of(true));
  deviceService.isAliasSaved.and.returnValue(false);

  service.trySwitchDevice([newDevice]).subscribe();

  expect(deviceService.restoreAlias).toHaveBeenCalled();
  expect(deviceService.setDeviceList).toHaveBeenCalledWith([newDevice]);
});

```

原始写法要测这些东西：

- 模拟用户选择设备
- 模拟 aliasEdit 状态
- 模拟弹窗确认
- 模拟设备加载逻辑
- Mock 多个内部变量 + setValue + emitEvent:false

Facade 写法只需要：

- Mock 弹窗结果（dialog.showConfirmDialog()）
- Mock alias 保存状态（deviceService.isAliasSaved()）

断言 service 行为（是否调用 restore/set）

优化不仅为了测试，更为了代码质量、团队效率和长期可维护性
目标	优化收益
✅ 可测试性	易于写测试用例、Mock 明确、边界清晰
✅ 单一职责	职责隔离、模块清晰
✅ 易维护	更少的文件耦合、更容易重构
✅ 可复用	相同逻辑可用于多个页面、服务或交互流程
✅ 响应式一致性	更好地使用 RxJS 模式，支持状态流和变更控制
✅ 易排查问题	状态清晰、副作用集中



