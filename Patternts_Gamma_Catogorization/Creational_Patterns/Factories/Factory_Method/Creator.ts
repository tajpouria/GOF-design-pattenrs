export {};

abstract class Creator {
  public abstract factoryMethod(): Product;

  someOperation() {
    const product = this.factoryMethod();

    return `Creator: The same creator's code has just worked with ${product.operation()}`;
  }
}

class ConcreteCreator1 extends Creator {
  factoryMethod() {
    return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  factoryMethod() {
    return new ConcreteProduct2();
  }
}

interface Product {
  operation(): string;
}

class ConcreteProduct1 implements Product {
  operation() {
    return `Result of ConcreteProduct1`;
  }
}

class ConcreteProduct2 implements Product {
  operation() {
    return `Result of ConcreteProduct2`;
  }
}

function clientCode(creator: Creator) {
  console.info(creator.someOperation());
}

clientCode(new ConcreteCreator1());

clientCode(new ConcreteCreator2());
