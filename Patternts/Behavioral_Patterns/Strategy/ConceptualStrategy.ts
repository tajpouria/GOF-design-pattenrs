namespace conceptualStrategy {
  export class Context {
    constructor(private strategy: Strategy) {}

    doSth(data: any[]) {
      return this.strategy.doAlgorithm(data);
    }
  }

  interface Strategy {
    doAlgorithm<T = string>(data: T[]): T[];
  }

  class ConcreteStrategyA implements Strategy {
    doAlgorithm<T = string>(data: T[]): T[] {
      return data.sort();
    }
  }

  class ConcreteStrategyB implements Strategy {
    doAlgorithm<T = string>(data: T[]): T[] {
      return data.reverse();
    }
  }

  export const strategies = { ConcreteStrategyA, ConcreteStrategyB };
}

namespace clientCode {
  const {
    Context,
    strategies: { ConcreteStrategyA, ConcreteStrategyB },
  } = conceptualStrategy;

  const contextA = new Context(new ConcreteStrategyA());
  const contextB = new Context(new ConcreteStrategyB());

  console.info(contextA.doSth([1, 2, 0, 3]), contextB.doSth([12, 3, 4]));
}
