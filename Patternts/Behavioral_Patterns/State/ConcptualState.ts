namespace conceptualState {
  export class Context {
    private state: State | undefined;

    constructor(state: State) {
      this.transitionTo(state);
    }

    public transitionTo(state: State) {
      this.state = state;
      this.state?.setContext(this);
    }

    public behave() {
      this.state?.behave();
    }
  }

  abstract class State {
    protected context: Context | undefined;

    public setContext(context: Context) {
      this.context = context;
    }

    abstract behave(): void;
  }

  export class ConcreteStateA extends State {
    behave(): void {
      console.log("State A behave!");
      this.context?.transitionTo(new ConcreteStateB());
    }
  }

  export class ConcreteStateB extends State {
    behave(): void {
      console.log("State B behave!");
      this.context?.transitionTo(new ConcreteStateA());
    }
  }
}

namespace clientCode {
  const { Context, ConcreteStateA } = conceptualState;

  const context = new Context(new ConcreteStateA());

  context.behave();
  context.behave();
  context.behave();
}
