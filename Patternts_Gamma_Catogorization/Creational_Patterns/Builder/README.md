# Builder

### When piecewise object construction is complicated, provide and API for doing it succinctly

![Builder pattern](https://refactoring.guru/images/patterns/content/builder/builder.png)

- Some object are simple and can created in a single constructor call
- Other objects require lot of ceremony it no to create
- Having an object with 10 constructor arguments is not productive
- Instead, opt for piecewise the contractor
- Builder provides an API for constructing and object step-by-step

**The Builder pattern can be recognized in class, which has a single creation method and several methods to configure the resulting object. Builder methods often support chaining (for example, someBuilder->setValueA(1)->setValueB(2)->create())**

[ ./Users.ts ](./Users.ts)

```ts
class Address {
  constructor(public zipCode: number) {}
}

class User {
  public age?: number;
  public address?: Address;

  constructor(private name: string) {}
}

class UserBuilder {
  private user: User;

  constructor(private name: string) {
    this.user = new User(name);
  }

  setAge(age: number) {
    this.user.age = age;
    return this; // Fluent Builder
  }

  setAddress(address: Address) {
    this.user.address = address;
    return this;
  }

  build() {
    return this.user;
  }
}

const user = new UserBuilder("Joe")
  .setAge(10)
  .setAddress(new Address(124))
  .build();

// OR

class newUser {
  public age?: number;
  public address?: Address;

  constructor(
    private name: string,
    { age, address }: { age?: number; address?: Address } = {},
  ) {
    this.age = age;
    this.address = address;
  }
}
```

[ ./HTMLBuilder.ts ](./HTMLBuilder.ts)

```ts
class HTMLBuilder {
  private children: [string, string][] = [];

  constructor(private rootElementName: string) {}

  addChild(childName: string, childContent: string) {
    this.children.push([childName, childContent]); // Fluent Builder
  }

  get str() {
    return `
    <${this.rootElementName}>
      ${this.children.map(
        ([childName, childContent]) =>
          `<${childName}>${childContent}</${childName}>`,
      )} 
    </${this.rootElementName}>
    `;
  }
}

const htmlBuilder = new HTMLBuilder("ul");
htmlBuilder.addChild("li", "foo").addChild("li", "bar");

console.log(htmlBuilder.str);
```

[./Product.ts](./Product.ts)

```ts
interface Builder {
  producePartA(): Builder;
  producePartB(): Builder;
  producePartC(): Builder;
}

class ConcertBuilder implements Builder {
  private product?: Product;

  constructor() {
    this.reset();
  }

  private reset() {
    this.product = new Product();
  }

  public producePartA() {
    this.product?.parts.push("PartA1");
    return this;
  }

  public producePartB() {
    this.product?.parts.push("PartB1");
    return this;
  }

  public producePartC() {
    this.product?.parts.push("PartC1");
    return this;
  }

  getProduct() {
    const result = this.product;
    this.reset();
    return result;
  }
}

interface IProduct {
  parts: string[];
  listParts: () => string;
}

class Product implements IProduct {
  public parts: string[] = [];

  public listParts(): string {
    return `Product contains ${this.parts.join(", ")} \n`;
  }
}

class Director {
  private _builder?: Builder;

  set builder(builder: Builder) {
    this._builder = builder;
  }

  buildMinimalVisibleProduct() {
    this._builder?.producePartA();
  }

  builderFullFeatureProduct() {
    this._builder
      ?.producePartA()
      .producePartB()
      .producePartC();
  }
}

function clientCode(director: Director) {
  const builder = new ConcertBuilder();

  director.builder = builder;

  director.buildMinimalVisibleProduct();
  console.info(builder.getProduct()?.listParts());

  director.builderFullFeatureProduct();
  console.info(builder.getProduct()?.listParts());
}

clientCode(new Director());
```
