namespace monostate2 {
  class CEO {
    public static _name = "";
    public get name(): string {
      return CEO._name;
    }
    public set name(value: string) {
      CEO._name = value;
    }

    public static _age = 0;
    public get age(): number {
      return CEO._age;
    }
    public set age(value: number) {
      CEO._age = value;
    }

    public toStr() {
      return `name: ${this.name}, age: ${this.age}`;
    }
  }

  const ceo = new CEO();
  ceo.name = "Foo";
  ceo.age = 12;

  const ceo2 = new CEO();
  console.log(ceo2.toStr());
}
