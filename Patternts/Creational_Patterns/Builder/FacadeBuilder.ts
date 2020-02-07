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
