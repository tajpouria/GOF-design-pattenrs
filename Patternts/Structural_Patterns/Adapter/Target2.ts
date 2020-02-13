namespace target2 {
  class Target {
    request(): string {
      return "Target Request";
    }
  }

  class Adaptee {
    request(): string {
      return "tseuqeR eetpadA";
    }
  }

  class Adapter extends Target {
    constructor(private adptee: Adaptee) {
      super();
    }

    request() {
      return this.adptee
        .request()
        .split("")
        .reverse()
        .join("");
    }
  }

  const adapter = new Adapter(new Adaptee());
  console.log(adapter.request());
}
