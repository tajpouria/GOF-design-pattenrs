# Builder

## when piecewise object construction is complicated, provide and API for doing it succinctly

![Builder pattern](https://refactoring.guru/images/patterns/content/builder/builder.png)

- Some object are simple and can created in a single constructor call
- Other objects require lot of ceremony it no to create
- Having an object with 10 constructor arguments is not productive
- Instead, opt for piecewise the contractor
- Builder provides an API for constructing and object step-by-step

./Builder.ts

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
```
