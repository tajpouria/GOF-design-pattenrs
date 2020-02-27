# Strategy Pattern

Strategy pattern is a behavioral design pattern that let us to place family of algorithms into it's separate classes and make it object interChangeAble

[ConceptualStrategy.ts](./ConceptualStrategy)

```ts
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
```

[Parser.ts](./Parser.ts)

```ts
export {};

interface ParseStrategy {
  parse(value: [string, string[]]): string;
}

namespace parser {
  export class HTMLParser implements ParseStrategy {
    parse(value: [string, string[]]): string {
      const [type, content] = value;

      return content
        .reduce((acc, curr) => acc + curr + "\n", `<${type}>`)
        .concat(`</${type}>`);
    }
  }

  export class MarkDownParser implements ParseStrategy {
    parse(value: [string, string[]]): string {
      const [type, content] = value;

      return content.map(c => `${type} `.concat(`${c}\n`)).join("");
    }
  }
}

namespace drawer {
  export class Drawer {
    constructor(private parseStrategy: ParseStrategy) {}

    public draw(tagType: string, tagContent: string[]) {
      return this.parseStrategy.parse([tagType, tagContent]);
    }
  }
}

namespace client {
  const { Drawer } = drawer;
  const { HTMLParser, MarkDownParser } = parser;

  const htmlDrawer = new Drawer(new HTMLParser());
  const mdDrawer = new Drawer(new MarkDownParser());

  console.log(
    htmlDrawer.draw("li", ["foo", "bar"]),
    "\n",
    mdDrawer.draw("*", ["foo", "bar"]),
  );
}
```
