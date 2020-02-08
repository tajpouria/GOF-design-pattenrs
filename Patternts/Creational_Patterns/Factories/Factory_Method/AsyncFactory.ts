namespace asyncFactory {
  class Foo {
    private constructor() {}

    public toString() {
      return "Successfully initialized";
    }

    public static async init(): Promise<Foo> {
      return new Promise(resolve =>
        setTimeout(() => {
          return resolve(new Foo());
        }, 1000),
      );
    }
  }

  Foo.init().then(res => console.log(res.toString()));
}
