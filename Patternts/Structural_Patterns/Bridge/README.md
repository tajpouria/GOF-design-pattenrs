# Bridge

![bridge](https://refactoring.guru/images/patterns/content/bridge/bridge.png)

Bridge pattern is a structural design pattern that let you to split a huge class or a couple of closely related class into two separate hierarchies which can be developed independently

[Conceptual.ts](./Conceptual.ts)

```ts
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
```

[./Shape.ts](./Shape.ts)

```ts
namespace bridgeShape {
  enum ColorTypes {
    "red",
    "green",
  }

  interface IColorImplementation {
    color: ColorTypes;
  }

  abstract class Shape {
    constructor(protected colorImplementation: IColorImplementation) {}
  }

  class RedColorImplementation implements IColorImplementation {
    public color = ColorTypes.red;
  }

  class GreenColorImplementation implements IColorImplementation {
    public color = ColorTypes.green;
  }

  class Circle extends Shape {
    constructor(
      private radius: number,
      colorImplementation: IColorImplementation,
    ) {
      super(colorImplementation);
    }
  }

  class Square extends Shape {
    constructor(
      private dim: number,
      colorImplementation: IColorImplementation,
    ) {
      super(colorImplementation);
    }
  }

  const greenCir = new Circle(10, new GreenColorImplementation());
  const redCir = new Circle(10, new RedColorImplementation());
}
```

[./Renderer.ts](Renderer.ts)

```ts
namespace renderer {
  interface IRenderer {
    drawCircle(radius: number): void;
  }

  class VectorRenderer implements IRenderer {
    drawCircle(radius: number): void {
      console.info(`Rendering a circle using vectors by radius: ${radius}`);
    }
  }

  class RasterRenderer implements IRenderer {
    drawCircle(radius: number): void {
      console.info(`Rendering a circle using rasters by radius: ${radius}`);
    }
  }

  class Circle {
    constructor(public renderer: IRenderer, public radius: number) {}

    public draw(): void {
      this.renderer.drawCircle(this.radius);
    }
  }

  const vrd = new VectorRenderer();
  const c = new Circle(vrd, 10);
  c.draw();

  const rrd = new RasterRenderer();
  const c1 = new Circle(rrd, 10);
  c1.draw();
}
```
