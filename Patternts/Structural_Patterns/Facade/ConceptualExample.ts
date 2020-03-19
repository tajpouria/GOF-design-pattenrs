namespace ConceptualFacade {
  export class Subsystem1 {
    operation1() {
      return "Operation1 of subsystem1 - ";
    }

    operationN() {
      return "OperationN of subsystem1 - ";
    }
  }

  export class Subsystem2 {
    operation2() {
      return "Operation2 of subsystem1 - ";
    }

    operationZ() {
      return "OperationZ of subsystem1 - ";
    }
  }

  export class Facade {
    private subsystem1: Subsystem1;
    private subsystem2: Subsystem2;

    constructor(subSystem1?: Subsystem1, subSystem2?: Subsystem2) {
      this.subsystem1 = subSystem1 || new Subsystem1();
      this.subsystem2 = subSystem2 || new Subsystem2();
    }

    operate() {
      const { subsystem1, subsystem2 } = this;
      let res = "- ";
      res += subsystem1.operation1();
      res += subsystem2.operation2();
      res += subsystem1.operationN();
      res += subsystem2.operationZ();

      return res;
    }
  }
}

namespace client {
  const { Facade } = ConceptualFacade;

  const f = new Facade();

  const result = f.operate();

  console.info(result);
}
