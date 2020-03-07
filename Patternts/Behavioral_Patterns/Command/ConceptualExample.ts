interface Command {
  execute(): void;
}

namespace conceptualCommand {
  export class SimpleCommand implements Command {
    private payload: string;

    public constructor(payload: string) {
      this.payload = payload;
    }

    public execute(): void {
      console.info(`Simple stuff like printing ${this.payload}`);
    }
  }

  export class ComplexCommand implements Command {
    private receiver: Receiver;

    private params: [string, string] | undefined;

    public constructor(receiver: Receiver, a: string, b: string) {
      this.receiver = receiver;
      this.params = [a, b];
    }

    public execute() {
      console.info("Doing complex stuff");
      this.params && this.receiver.doSomething(...this.params);
    }
  }

  export class Receiver {
    public doSomething(a: string, b: string) {
      console.info(`Receiver: working on ${a} and ${b}`);
    }
  }
}

namespace client {
  const { SimpleCommand, ComplexCommand, Receiver } = conceptualCommand;

  class Invoker {
    private onStart: Command | undefined;
    private onFinish: Command | undefined;

    public setOnStart(command: Command) {
      this.onStart = command;
    }

    public setOnFinish(command: Command) {
      this.onFinish = command;
    }

    public doSomethingImportant() {
      this.onStart?.execute();
      this.onFinish?.execute();
    }
  }

  const invoker = new Invoker();

  invoker.setOnStart(new ComplexCommand(new Receiver(), "a", "b"));
  invoker.setOnFinish(new SimpleCommand("payload"));
  invoker.doSomethingImportant();
}
