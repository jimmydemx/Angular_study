/**
 *  将具体逻辑与使用此具体逻辑的代码分离，使得具体逻辑算法可以独立：
 *  - 使用逻辑对于具体逻辑只知道他们都有共同的方法，相对来说耦合较小
 *  - 具体逻辑容易扩展，有共同点(共同接口）
 *  - formControl 的ValueAccessor 就是使用了此pattern
 */



// 定义策略接口
interface PaymentStrategy {
  pay(amount: number): void;
}

// 具体策略
class CreditCardPayment implements PaymentStrategy {
  pay(amount: number) {
    console.log(`Paid ${amount} via Credit Card`);
  }
}

class PayPalPayment implements PaymentStrategy {
  pay(amount: number) {
    console.log(`Paid ${amount} via PayPal`);
  }
}

// Context 类（解耦调用方与具体策略）
class PaymentProcessor {
  public strategy:PaymentStrategy
  constructor(private injectStrategy: PaymentStrategy) {
    this.strategy = injectStrategy;
  }
  executePayment(amount: number) {
    this.strategy.pay(amount);
  }
}

// 使用
const processor = new PaymentProcessor(new CreditCardPayment());
processor.executePayment(100); // Paid 100 via Credit Card

// 可随时替换策略
processor.strategy = new PayPalPayment();
processor.executePayment(200); // Paid 200 via PayPal
