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
