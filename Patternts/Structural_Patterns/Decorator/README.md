# Decorator

Decorator is a structural design pattern that let us to add behavior to an object by wrapping it into a wrapper object that contains it behaviors

[./ConceptualExample.ts](./ConceptualExample.ts)

```ts
namespace conceptualDecorator {
  interface Component {
    operation(): string;
  }

  class ConcreteComponent implements Component {
    operation(): string {
      return "Component";
    }
  }

  class Decorator implements Component {
    constructor(protected component: Component) {}

    operation(): string {
      return this.component.operation();
    }
  }

  class ConcreteDecoratorA extends Decorator {
    operation(): string {
      return `DecoratorA (${super.operation()}`;
    }
  }

  class ConcreteDecoratorB extends Decorator {
    operation(): string {
      return `DecoratorB (${super.operation()})`;
    }
  }

  const simpleComponent = new ConcreteComponent();
  console.info("Simple:", simpleComponent.operation());

  const decoratedComponent1 = new ConcreteDecoratorA(simpleComponent);
  const decoratedComponent2 = new ConcreteDecoratorB(decoratedComponent1);

  console.info("Decorated:", decoratedComponent2.operation());
}
```
