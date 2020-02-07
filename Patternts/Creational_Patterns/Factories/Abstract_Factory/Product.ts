export {};

interface AbstractFactory {
  createProductA(): AbstractProductA;
  createProductB(): AbstractProductB;
}

class ConcreteFactory1 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ConcreteProductA1();
  }

  createProductB(): AbstractProductB {
    return new ConcreteProductB1();
  }
}

class ConcreteFactory2 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ConcreteProductA2();
  }

  createProductB(): AbstractProductB {
    return new ConcreteProductB2();
  }
}

interface AbstractProductA {
  usefulFunctionA(): string;
}

class ConcreteProductA1 implements AbstractProductA {
  usefulFunctionA() {
    return "The result of product A1\n";
  }
}

class ConcreteProductA2 implements AbstractProductA {
  usefulFunctionA() {
    return "The result of product A2\n";
  }
}

interface AbstractProductB {
  usefulFunctionB(): string;
  anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

class ConcreteProductB1 implements AbstractProductB {
  usefulFunctionB() {
    return "The result of product B1\n";
  }

  anotherUsefulFunctionB(collaborator: AbstractProductA) {
    const result = collaborator.usefulFunctionA();
    return `The result of product B1 collaborating with ( ${result} )\n`;
  }
}

class ConcreteProductB2 implements AbstractProductB {
  usefulFunctionB() {
    return "The result of product B2\n";
  }

  anotherUsefulFunctionB(collaborator: AbstractProductA) {
    const result = collaborator.usefulFunctionA();
    return `The result of product B2 collaborating with ( ${result} )\n`;
  }
}

function clientCode(concreteFactory: AbstractFactory) {
  const productA = concreteFactory.createProductA();
  const productB = concreteFactory.createProductB();

  console.info(
    productA.usefulFunctionA(),
    productB.usefulFunctionB(),
    productB.anotherUsefulFunctionB(productA),
  );
}

clientCode(new ConcreteFactory1());
clientCode(new ConcreteFactory2());
