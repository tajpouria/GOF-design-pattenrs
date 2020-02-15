namespace conceptualBride {
  class Abstraction {
    constructor(protected implementation: Implementation) {}

    protected operation() {
      const result = this.implementation.implementationOperation();
      return `Abstraction operation with : \n ${result}`;
    }
  }

  interface Implementation {
    implementationOperation(): string;
  }

  class ExtendedAbstraction extends Abstraction {
    public operation() {
      const result = this.implementation.implementationOperation();

      return `ExtendedAbstraction operation with:\n${result}`;
    }
  }

  class ConcreteImplementationA implements Implementation {
    implementationOperation(): string {
      return `ConcreteImplementationA`;
    }
  }

  class ConcreteImplementationB implements Implementation {
    implementationOperation(): string {
      return `ConcreteImplementationB`;
    }
  }

  const implementationA = new ConcreteImplementationA();
  const abstractionA = new ExtendedAbstraction(implementationA);
  console.log(abstractionA.operation());

  let implementationB = new ConcreteImplementationB();
  const abstractionB = new ExtendedAbstraction(implementationB);
  console.log(abstractionB.operation());
}
