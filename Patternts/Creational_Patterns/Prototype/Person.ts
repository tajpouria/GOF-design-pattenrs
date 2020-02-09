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
