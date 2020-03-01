import { EventEmitter } from "events";

namespace logger {
  export class Logger extends EventEmitter {
    log(message: string) {
      console.log(message);
      this.emit(this.events.messageLogged, message);
    }

    public events = {
      messageLogged: "messageLogged",
    };
  }
}

namespace client {
  const { Logger } = logger;

  class ConcreteObserverA {
    constructor(logger: InstanceType<typeof Logger>) {
      logger.on(logger.events.messageLogged, msg => {
        console.info("ConcreteObserverA:: ", msg);
      });
    }
  }

  class ConcreteObserverB {
    constructor(logger: InstanceType<typeof Logger>) {
      logger.on(logger.events.messageLogged, msg => {
        console.info("ConcreteObserverB:: ", msg);
      });
    }
  }

  const log = new Logger();

  new ConcreteObserverA(log);
  new ConcreteObserverB(log);

  setTimeout(() => {
    log.log("spam");
  }, 3000);
}
