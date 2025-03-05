/**
 *  1,产品需要符合一定规范，有名字, 有sell,buy方法
 *  2,生产有一定规范，需要产出这样规范的产品
 *  3，生产有一定的特殊性，需要在Europe生产，或者Asian生产
 */

/**
 * 解耦：
 */

abstract class Product{
  public sell(){
    console.log("this product is sold")
  }

  public abstract buy():()=>any;
}
class Fruits extends Product{
  buy(): any {
    console.log("Fruits shall be bought from supermarket");
  }
}

class Apartments extends Product{
  buy(): any {
    console.log("Apartments shall be bought from real estate");
  }
}

abstract class Creator{
  abstract createProduct<T extends Product>(c: new () => T): T;

}

class EuropeCreator extends Creator{
  createProduct<T extends Product>(c: { new(): T }): T {
    return new c();
  }
}


class AsiaCreator extends Creator{
  createProduct<T extends Product>(c: { new(): T }): T {
    return new c();
  }
}


