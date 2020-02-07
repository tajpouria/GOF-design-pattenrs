# Builder

### When piecewise object construction is complicated, provide and API for doing it succinctly

![Builder pattern](https://refactoring.guru/images/patterns/content/builder/builder.png)

**The Builder pattern can be recognized in class, which has a single creation method and several methods to configure the resulting object. Builder methods often support chaining (for example, someBuilder->setValueA(1)->setValueB(2)->create())**

## Regular Fluent Builder

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

[ ./HTMLBuilder2.ts ](./HTMLBuilder2.ts)

```ts
namespace htmlBuilder2 {
  function space(times = 1): string {
    const sp = " ";
    return sp.repeat(times);
  }

  class HTMLElement {
    public name = " ";
    public text = " ";
    public indentSize = 2;
    public elements: Array<HTMLElement> = [];

    public toString(indent: number): string {
      const { name, text, elements, indentSize } = this;

      const res = [];

      const tarIndent = indent * indentSize;

      res.push(space(tarIndent));
      res.push(`<${name}>\n`);

      if (text?.trim()) {
        res.push(space(tarIndent));
        res.push(`${text}\n`);
      }

      if (elements.length) res.push(elements.map(e => e.toString(indent + 1)));

      res.push(space(tarIndent));
      res.push(`</${name}>\n`);

      return res.join("");
    }

    public appendChild(element: HTMLElement): void {
      this.elements.push(element);
    }
  }

  class HTMLBuilder {
    private _root = new HTMLElement();
    constructor(private rootName: string) {
      this.clear();
      this._root.name = rootName;
    }

    public appendChild(childName: string, childText: string): HTMLBuilder {
      const ele = new HTMLElement();
      ele.name = childName;
      ele.text = childText;

      this._root.appendChild(ele);

      return this;
    }

    public toString(): string {
      return this._root.toString(0);
    }

    public clear(): void {
      this._root = new HTMLElement();
    }
  }

  const hbl = new HTMLBuilder("ul");
  hbl.appendChild("li", "foo").appendChild("li", "bar");
  console.log(hbl.toString());
}
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

## Fluent Builder Inheritance

[./FluentBuilderInheritance.ts](./FluentBuilderInheritance.ts)

```ts
namespace fluentBuilderInheritance {
  class Person {
    public name?: string;
    public position?: string;

    public static New = () => new Builder();

    public toString(): string {
      return `Name: ${this.name}, Position: ${this.position}`;
    }
  }

  abstract class PersonBuilder {
    protected person = new Person();

    public build(): Person {
      return this.person;
    }
  }

  class PersonInfoBuilder<
    SELF extends PersonInfoBuilder<SELF>
  > extends PersonBuilder {
    protected person = new Person();

    public called(name: string): SELF {
      this.person.name = name;

      return (this as unknown) as SELF;
    }
  }

  class PersonJobBuilder<
    SELF extends PersonJobBuilder<SELF>
  > extends PersonInfoBuilder<PersonJobBuilder<SELF>> {
    public worksAt(position: string): SELF {
      this.person.position = position;

      return (this as unknown) as SELF;
    }
  }

  class Builder extends PersonJobBuilder<Builder> {}

  const prs = Person.New()
    .called("Bar")
    .worksAt("foo")
    .build();

  console.log(prs.toString());
}
```

### Functional Builder

[./FunctionalBuilder.ts](./FunctionalBuilder.ts)

```ts
namespace funcBuilder {
  class Person {
    public name?: string;
    public position?: string;

    public toString() {
      return `Name: ${this.name}, Position: ${this.position}`;
    }
  }

  type Action = (p: Person) => void;

  class PersonBuilder {
    private person = new Person();

    private actions: Array<Action> = [];

    public addAction(action: Action): void {
      this.actions.push(action);
    }

    public build(): Person {
      this.actions.forEach(a => a(this.person));

      return this.person;
    }
  }

  class PersonNameModExtension {
    public static called(builder: PersonBuilder, name: string) {
      builder.addAction(p => {
        p.name = name;
      });
    }
  }

  class PersonJobModExtension {
    public static worksAt(builder: PersonBuilder, position: string) {
      builder.addAction(p => {
        p.position = position;
      });
    }
  }

  const pb = new PersonBuilder();

  PersonJobModExtension.worksAt(pb, "Bar");
  PersonNameModExtension.called(pb, "Foo");

  const per = pb.build();

  console.log(per.toString());
}
```

## Facade Builder

[./FacadeBuilder.ts](./FacadeBuilder.ts)

```ts
namespace facadeBuilder {
  class Person {
    public position?: string;
    public annualIncome?: number;

    public city?: string;
    public postalCode?: string;

    toString(): string {
      return `position: ${this.position}, annualIncome: ${this.annualIncome}, city: ${this.city}, postalCode: ${this.postalCode}`;
    }
  }

  // Facade
  class PersonBuilder {
    // ref
    protected _person = new Person();

    public get person(): Person {
      return this._person;
    }

    public get job(): JobBuilder {
      return new JobBuilder(this.person);
    }

    public get address(): AddressBuilder {
      return new AddressBuilder(this.person);
    }
  }

  class JobBuilder extends PersonBuilder {
    constructor(person: Person) {
      super();
      this._person = person;
    }

    public as(position: string): JobBuilder {
      this._person.position = position;
      return this;
    }

    public with(annualIncome: number): JobBuilder {
      this._person.annualIncome = annualIncome;
      return this;
    }
  }

  class AddressBuilder extends PersonBuilder {
    constructor(person: Person) {
      super();
      this._person = person;
    }

    public city(city: string): AddressBuilder {
      this._person.city = city;
      return this;
    }

    public postalCode(pc: string): AddressBuilder {
      this._person.postalCode = pc;
      return this;
    }
  }

  const pb = new PersonBuilder();

  pb.job
    .as("SD")
    .with(100000000000)
    .address.city("NW")
    .postalCode("123W");

  console.log(pb.person.toString());
}
```
