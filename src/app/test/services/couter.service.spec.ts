import { TestBed } from '@angular/core/testing';
import {first, take} from 'rxjs';

import { CouterService } from './couter.service';

describe('CouterService', () => {
  let service: CouterService;


  function expectCount(count:number) :void{
    let actualCount: number | undefined;
    service.getCount().pipe(first()).subscribe(
    (counter)=>{
      actualCount = counter
    });

    expect(actualCount).toBe(count)
  }

  /**
   * TestBed.configureTestingModule({
   *   declarations: [MyComponent],    // 声明组件、指令、管道
   *   providers: [MyService],         // 提供服务（等同于 @Injectable 的注入）
   *   imports: [FormsModule],         // 引入模块（可以是 HttpClientModule、RouterTestingModule 等）
   * });
   */
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouterService);
  });

  /**
   * 使用estBed.inject() 能确保：
   *
   * 服务实例由 Angular 的 DI 容器管理，与生产环境行为完全一致。
   *
   * 生命周期钩子（如 ngOnInit）和 依赖解析 会按 Angular 的规则执行。
   *
   * 直接 new 会绕过 DI 系统，导致测试环境与真实环境不一致，可能掩盖潜在问题。
   *
   * TestBed.inject() 与 Angular 测试工具深度集成：
   *
   * 变更检测：与 fixture.detectChanges() 协作。
   *
   * 异步操作：支持 fakeAsync/async 等工具。
   *
   * 覆盖检查：与 Angular 的测试覆盖率工具兼容。
   */

  afterEach(() => {
    // Ensure no memory leaks
    service.complete();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with 0', (done) => {
    service.getCount().pipe(take(1)).subscribe(count => {
      expect(count).toBe(0);
      done();
    });
  });

  it('should increment count by 1', (done) => {
    service.increment();
    service.getCount().pipe(take(1)).subscribe(count => {
      expect(count).toBe(1);
      done();
    });
  });

  it('should decrement count by 1', (done) => {
    service.increment(); // count: 1
    service.decrement(); // count: 0
    service.getCount().pipe(take(1)).subscribe(count => {
      expect(count).toBe(0);
      done();
    });
  });



  it('should reset count to given number', (done) => {
    service.reset(100);
    service.getCount().pipe(take(1)).subscribe(count => {
      expect(count).toBe(100);
      done();
    });
  });


  it('should complete the observable', (done) => {
    const subscription = service.getCount().subscribe({
      complete: () => {
        expect(true).toBeTrue();
        done();
      }
    });
    service.complete();
    subscription.unsubscribe();
  });

});
