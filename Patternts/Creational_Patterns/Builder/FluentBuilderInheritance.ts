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
