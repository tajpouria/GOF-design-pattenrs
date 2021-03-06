# Command

<div style="width: 640px; height: 480px; margin: 10px; position: relative;"><iframe allowfullscreen frameborder="0" style="width:640px; height:480px" src="https://www.lucidchart.com/documents/embeddedchart/b86645bc-2df0-4c70-b23a-49cf48d2dd81" id="n0oETsQ3cx2f"></iframe></div>

The command pattern is a behavioral design pattern that turn simple command or requests into stand-alone objects this object contains all the information about request and this transformation allows differed or remote execution, storing command history and etc...

[ConceptualExample.ts](ConceptualExample.ts)

```ts
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
```

[Calculator.ts](./Calculator.ts)

```ts
namespace calculator {
  export class Calculator {
    private _value: number;
    public get value(): number {
      return this._value;
    }
    public set value(value: number) {
      this._value = value;
    }

    private history: Command[] = [];

    constructor(private initialValue: number = 0) {
      this._value = initialValue;
    }

    public executeCommand(command: Command): void {
      this.value = command.execute(this.value);
      this.history.push(command);
    }

    public undo(): void {
      const latestCommand = this.history.pop();

      if (latestCommand) {
        this.value = latestCommand.unExecute(this.value);
      }
    }
  }

  interface Command {
    execute(currentValue: number): number;
    unExecute(currentValue: number): number;
  }

  export class AddCommand implements Command {
    constructor(private valueToAdd: number) {}

    execute(currentValue: number): number {
      return currentValue + this.valueToAdd;
    }

    unExecute(currentValue: number): number {
      return currentValue - this.valueToAdd;
    }
  }

  export class MultiplyCommand implements Command {
    constructor(private valueToMultiplyWith: number) {}

    execute(currentValue: number): number {
      return currentValue * this.valueToMultiplyWith;
    }

    unExecute(currentValue: number): number {
      return currentValue / this.valueToMultiplyWith;
    }
  }

  export class AddThenMultiply implements Command {
    constructor(
      private valueToAdd: number,
      private valueToMultiplyWith: number,
    ) {}

    execute(currentValue: number): number {
      return (currentValue + this.valueToAdd) * this.valueToMultiplyWith;
    }

    unExecute(currentValue: number): number {
      return currentValue / this.valueToMultiplyWith - this.valueToAdd;
    }
  }
}

namespace client {
  const {
    Calculator,
    AddCommand,
    MultiplyCommand,
    AddThenMultiply,
  } = calculator;

  const cal = new Calculator();

  cal.executeCommand(new AddCommand(10));
  console.log(cal.value);
  cal.executeCommand(new MultiplyCommand(4));
  console.log(cal.value);
  cal.executeCommand(new AddThenMultiply(10, 2));
  console.log(cal.value);

  cal.undo();
  console.log(cal.value);
  cal.undo();
  console.log(cal.value);
}
```
