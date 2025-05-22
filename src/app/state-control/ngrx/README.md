
# 1,描述
为的是保存一个全局的StateObject(RootStates)

> interface RootStates{ user: UserReducer.UserState ...} 

NgRx 是基于 Action 驱动的响应式系统。
- Action 表示一个明确发生的事件
- Reducer 负责根据 Action 更新 state
= Effect 负责响应 Action 做副作用（如请求数据）
- 所有模块通过监听公共 Action 实现解耦协作



步骤：

- 1, Action: 到底会有哪些Action存在(loadUser, add to Cart...)
- 2，reducer: 为的是保存一个全局的StateObject中存储的property又什么影响
- 3，selector其实就是对于全局的StateObject中的property进行选择
- 4，effect就是对于具体的Action做的事情进行描述
- index中需要以Root形式注入Effect以及Action

# 2. constructor(private store:Store){} 方法小结

| 方法                         | 说明                                         | 示例代码 |
|------------------------------|----------------------------------------------|----------|
| `dispatch(action)`           | 向 store 派发一个 Action                     | `this.store.dispatch(loginSuccess({ user }));` |
| `select(selector)`           | 从 store 中选择一个状态片段（返回 Observable）| `this.store.select(selectUser)` |
| `pipe(select(...))`          | 组合 RxJS 操作链，常用于组件中订阅状态       | `this.store.pipe(select(selectCartItems))` |
| `addReducer(key, reducer)`   | 动态添加 reducer（NgRx 14+ 支持懒加载模块）  | `this.store.addReducer('products', productsReducer)` |
| `removeReducer(key)`         | 动态移除 reducer（NgRx 14+）                 | `this.store.removeReducer('products')` |
| `source`                     | 获取底层状态流 Observable（一般用于调试）    | `this.store.source.subscribe(console.log)` |



# 3.ngRX可能存在的问题：
当一个ChangeUser的Action可能带来不同的模块的Effect，那么只需在各个模块中相应的对于这个Action进行相应就可以了，比如
但是也可能出现问题，当一个Action被dispatch以后，会在不同的地方会有相应,这样对于追踪会造成一定的困难，解决方法
- 全局搜索`ofType(changeUserRole)`
- 使用Devtool


```typescript

// user.actions.ts
export const changeUserRole = createAction(
  '[User] Change Role',
  props<{ newRole: string }>()
);
// ========================

// cart.effects.ts
loadOnRoleChange$ = createEffect(() =>
  this.actions$.pipe(
    ofType(changeUserRole),
    map(() => clearCart())
  )
);

// product.effects.ts
loadAdminProducts$ = createEffect(() =>
  this.actions$.pipe(
    ofType(changeUserRole),
    filter(action => action.newRole === 'admin'),
    switchMap(() => this.api.getAdminProducts()),
    map(products => loadProductsSuccess({ products }))
  )
);

// settings.effects.ts
loadSettingsOnRoleChange$ = createEffect(() =>
  this.actions$.pipe(
    ofType(changeUserRole),
    switchMap(() => this.api.getSettings()),
    map(settings => loadSettingsSuccess({ settings }))
  )
);

```


# 4. 使用Devtool的方法

```bash
ng add @ngrx/store-devtools
//或者
npm install @ngrx/store-devtools --save

// 然后在AppModule中引入

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    // ... other imports
    StoreDevtoolsModule.instrument({
      maxAge: 25, // 状态记录数量
      logOnly: environment.production, // 生产环境只读
    }),
  ],
})
export class AppModule {}


//-----------例子 -------------
dispatch(userRoleChanged({ newRole: 'admin' })) 
// 在DevTool 可以看到
→ userRoleChanged { newRole: 'admin' }
→ updateUserInfo
→ clearCart
→ reloadOrdersByNewRole
→ loadSettingsByRole



```


# 5. 测试方法




