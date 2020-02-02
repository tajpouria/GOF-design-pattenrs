namespace monostate {
  export class Foo {
    private static _data: string;

    get data(): string {
      return Foo._data;
    }

    set data(value: string) {
      Foo._data = value;
    }
  }
}

namespace demo {
  const { Foo } = monostate;

  const f1 = new Foo();
  const f2 = new Foo();

  f1.data = "good";

  console.log(f2.data); // good
}
