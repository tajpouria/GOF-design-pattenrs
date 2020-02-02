namespace foo {
  interface IFoo {
    name(): void;
  }

  export class Foo implements IFoo {
    private static instance: Foo;

    public count = 0;

    private constructor() {
      ++this.count;
    }

    name() {
      console.info(`foo-${this.count}`);
    }

    static create() {
      if (!Foo.instance) {
        Foo.instance = new Foo();
      }
      return Foo.instance;
    }
  }
}

namespace bar {
  const { Foo } = foo;

  const f1 = Foo.create();
  const f2 = Foo.create();
  f1.name(); // 1
}
