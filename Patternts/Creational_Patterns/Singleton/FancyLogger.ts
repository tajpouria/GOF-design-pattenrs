namespace fancyLogger {
  class FancyLogger {
    private logs: string[] = [];

    log(message: string) {
      this.logs.push(message);
      console.info(`Fancy ${message}`);
    }

    printLogCount() {
      console.info(this.logs.length);
    }
  }

  export const logger = Object.freeze(new FancyLogger());
}

namespace demo1 {
  const { logger } = fancyLogger;

  logger.log("demo1");
  logger.printLogCount(); // 1
}

namespace demo2 {
  const { logger } = fancyLogger;

  logger.log("demo2");
  logger.printLogCount(); // 2
}
