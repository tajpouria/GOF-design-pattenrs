namespace target {
  class Target {
    request() {
      return "The default Target's behavior";
    }
  }

  export class Adaptee {
    specificRequest() {
      return ".eetpadA eht fo roivaheb laicepS";
    }
  }

  export class Adaptor extends Target {
    constructor(private adaptee: Adaptee) {
      super();
    }

    request() {
      const result = this.adaptee
        .specificRequest()
        .split("")
        .reverse()
        .join("");

      return result;
    }
  }
}

namespace demo {
  const { Adaptee, Adaptor } = target;

  const ada = new Adaptee();

  const adaptor = new Adaptor(ada);

  console.log(adaptor.request());
}
