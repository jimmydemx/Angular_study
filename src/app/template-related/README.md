在HTML 文件中的变量：
- 全局变量： 使用`#variableName` 变量名拿到，directive如果有exportAs 也是可以拿到的
- 局部变量， as 以及let拿到 `ngTemplateOutletContext`的变量，但是只能够是局部使用




```typescript
//----------------原始代码 ----------------//
export class DashboardComponent {
  user$ = this.userService.user$; // Observable<User>

  selectedTab = 'overview';

  isAdmin(user: User): boolean {
    return user.roles.includes('admin');
  }

  constructor(private userService: UserService) {}
}

```

```html
<div *ngIf="user$ | async as user">
  <h1>Welcome, {{ user.name }}</h1>

  <div *ngIf="isAdmin(user)">
    <button (click)="selectedTab = 'admin'">Admin Panel</button>
  </div>

  <div>
    <button (click)="selectedTab = 'overview'">Overview</button>
    <button (click)="selectedTab = 'settings'">Settings</button>
  </div>

  <div [ngSwitch]="selectedTab">
    <app-overview *ngSwitchCase="'overview'" [user]="user"></app-overview>
    <app-settings *ngSwitchCase="'settings'" [user]="user"></app-settings>
    <app-admin-panel *ngSwitchCase="'admin'" *ngIf="isAdmin(user)"></app-admin-panel>
  </div>
</div>
```

目的是不要使用`isAdmin`以及`selectedTab`,应该怎么样去做？
- user.roles.includes('admin'); 可以直接替代isAdmin，所以直接使用user.roles.includes('admin')没有问题
- selectedTab 怎么样消除呢？分析，因为selectedTab必须要保存一个值，而下面的方法不行，因为ngif下面没有ngIfTab，所以也用不了，而且即使可以这样tab也只是`已读`不能够赋值。
```html
<ng-container *ngIf="true as show; let tab = 'overview'">
  <!-- 这里 tab = 'overview' 是假的写法 -->
</ng-container>
```
下面折中的想法是：使用一个隐藏的formControl/ngModel因为ngModel作为directive是可以在其中保存值的。
```html
<input type="hidden" [(ngModel)]="tab" #tabInput="ngModel" />

<button (click)="tabInput.control.setValue('overview')">Overview</button>
<button (click)="tabInput.control.setValue('settings')">Settings</button>
<button *ngIf="user.roles.includes('admin')" (click)="tabInput.control.setValue('admin')">Admin</button>

<ng-container [ngSwitch]="tab">
  <app-overview *ngSwitchCase="'overview'" [user]="user"></app-overview>
  <app-settings *ngSwitchCase="'settings'" [user]="user"></app-settings>
  <app-admin-panel *ngSwitchCase="'admin'" [user]="user"></app-admin-panel>
</ng-container>

```

但是这不是`best practice`,因为：
- <input type="hidden"> 语义上是用于 提交隐藏数据到表单，不是用于作为状态变量。这可能让其他开发者看到后感到困惑
