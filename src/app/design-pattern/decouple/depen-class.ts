/**
 *  修改前:
 */

/***
 *   测试： 对于下面方法如果对methodA 进行单体测试, 必须要进行实例化class B，才能
 *
 */
class ClassB {
  public methodB() {
    console.log("Method B");
  }
}

class ClassA {
  private classB: ClassB;

  constructor() {
    this.classB = new ClassB();  // Class A 知道Class B太多信息，知道了ClassB构造的方法
  }

  public methodA() {
    this.classB.methodB();  // Class A 知道了必须要条用class B中的methodB的方法；
  }
}

/**
 *  修改后：
 */

interface IClassB {
  methodB(): void;
}

class ClazzB implements IClassB {
  public methodB() {
    console.log("Method B");
  }
}

class ClazzA {
  private classB: IClassB;

  constructor(classB: IClassB) {
    this.classB = classB;  // 依赖抽象接口，而不是具体实现
  }

  public methodA() {
    this.classB.methodB();  // 通过接口调用方法
  }
}

// 使用依赖注入来创建实例
const clazzB = new ClazzB();
const clazzA = new ClazzA(clazzB);

