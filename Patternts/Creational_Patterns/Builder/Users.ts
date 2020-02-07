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
    return this;
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
