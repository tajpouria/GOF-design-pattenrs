# ProtoType

### Prototype is a creational design pattern that let you to copy existing object without making your code to dependent on their class

![ProtoType](https://refactoring.guru/images/patterns/content/prototype/prototype.png)

**The prototype can be easily recognized by a clone or copy methods, etc.**

[Clone Tricks](../../../Sundry/CloneTricks.ts)

[./Primitive.ts](./Primitive.ts)

```ts
namespace primitive {
  export class Prototype {
    constructor(
      public primitive: any,
      public component: Object,
      public circularReference?: ComponentWithBackReference,
    ) {}

    clone(): this {
      const clone = Object.create(this);

      clone.component = Object.create(this.component);

      clone.circularReference = {
        ...this.circularReference,
        prototype: { ...this },
      };

      return clone;
    }
  }

  export class ComponentWithBackReference {
    constructor(public prototype: Prototype) {}
  }
}

namespace clientCode {
  const { Prototype, ComponentWithBackReference } = primitive;

  export function exec() {
    const p1 = new Prototype(12, new Date());

    p1.circularReference = new ComponentWithBackReference(p1);

    const p2 = p1.clone();

    if (p1.primitive === p2.primitive) {
      console.log(
        "Primitive field values have been carried over to a clone. Yay!",
      );
    } else {
      console.log("Primitive field values have not been copied. Booo!");
    }
    if (p1.component === p2.component) {
      console.log("Simple component has not been cloned. Booo!");
    } else {
      console.log("Simple component has been cloned. Yay!");
    }

    if (p1.circularReference === p2.circularReference) {
      console.log("Component with back reference has not been cloned. Booo!");
    } else {
      console.log("Component with back reference has been cloned. Yay!");
    }

    if (p1.circularReference.prototype === p2.circularReference!.prototype) {
      console.log(
        "Component with back reference is linked to original object. Booo!",
      );
    } else {
      console.log("Component with back reference is linked to the clone. Yay!");
    }
  }

  exec();
}
```

[./Person.ts](./Person.ts)

```ts
namespace clone {
  interface IClone<T> {
    clone(): T;
  }

  class Person implements IClone<Person> {
    constructor(public names: [string, string], public address: Address) {}

    public get toStr(): string {
      return `Name: ${this.names.join(" ")}, Address: ${this.address.toStr}`;
    }

    public clone(): Person {
      return new Person(
        <[string, string]>Array.from(this.names),
        this.address.clone(),
      );
    }
  }

  class Address implements IClone<Address> {
    constructor(public streetName: string, public streetNumber: number) {}

    public get toStr(): string {
      return `Name: ${this.streetName}, Address: ${this.streetNumber}`;
    }

    public clone(): Address {
      return new Address(this.streetName, this.streetNumber);
    }
  }

  const ps1 = new Person(["Foo", "Foo"], new Address("123L", 123));
  const ps2 = ps1.clone();

  ps2.names = ["Bar", "Bar"];
  ps2.address.streetNumber = 321;

  console.log(ps1.toStr);
  console.log(ps2.toStr);
}
```
