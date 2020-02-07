namespace contact {
  export class Address {
    constructor(
      public street: string,
      public city: string,
      public suit: number,
    ) {}
  }

  export class Contact {
    constructor(public name: string, public address: Address) {}

    clone(): this {
      const clone = Object.create(this);
      clone.address = {
        ...this.address,
      };

      return clone;
    }

    get introduce() {
      return `${this.name} from ${this.address.city} - ${this.address.street} - ${this.address.suit} \n`;
    }
  }
}

namespace demo {
  const { Contact, Address } = contact;

  const userOne = new Contact(
    "John",
    new Address("123 East Dr", "London", 102),
  );

  const userTwo = userOne.clone();

  userTwo.name = "Jane";
  userTwo.address.suit = 123;

  console.info(userOne.introduce, userTwo.introduce);
}
