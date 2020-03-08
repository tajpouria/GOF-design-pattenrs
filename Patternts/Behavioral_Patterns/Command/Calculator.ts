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
