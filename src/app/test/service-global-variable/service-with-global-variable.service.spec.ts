import { TestBed } from '@angular/core/testing';

import { ServiceWithGlobalVariableService } from './service-with-global-variable.service';



describe('ServiceWithGlobalVariableService', () => {
  let service: ServiceWithGlobalVariableService;

  // const service = new CounterService();  // 直接创建实例
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[ServiceWithGlobalVariableService]
    });
    service = TestBed.inject(ServiceWithGlobalVariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shall increase on counter',()=>{
    service.increase();
    expect(service.counter).toBe(1);
  })

  /**
   * 注意结果得到的是2而不是3，原因是 TestBed 每次都创建一个新的ServiceWithGlobalVariableService 实例
   * 所以全局变量counter总是从初始值0开始
   * 如果不使用TestBed，直接创建实例，就会让全局变量进行更改，下面结果应该为3
   */

  /**
   * 如果这个service 被两个component共享，也会出现更明显的问题：
   *   beforeEach(() => {
   *     TestBed.configureTestingModule({
   *       declarations: [Component1, Component2],
   *       providers: [CounterService]
   *     });
   *
   *     component1 = TestBed.createComponent(Component1).componentInstance;
   *     component2 = TestBed.createComponent(Component2).componentInstance;
   *     service = TestBed.inject(CounterService);
   *   });
   *
   *   任何component1以及component2的变化都影响counter的值
   */
  it('shall increase again on counter',()=>{
    service.increase();
    service.increase();
    expect(service.counter).toBe(2);
  })

  /**
   * 如果把全局的counter换成BehaviorSubject就会完全避免这这种影响，
   * 不管是否使用testBed,counter$.subscribe每一次的subscribe都会从0开始，
   *  private counterSubject = new BehaviorSubject<number>(0);
   *  public counter$ = this.counterSubject.asObservable();
   */

  it('shall rest the value of counter',()=>{
    service.reset(10);
    expect(service.counter).toBe(10);
  })
});
