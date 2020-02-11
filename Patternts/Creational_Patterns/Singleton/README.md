# Singleton

### A components witch is instantiated only once

Singleton is a creational design pattern that lets you ensure that a class has only one instance, while providing a global access point to this instance.

**Singleton can be recognized by a static creation method, which returns the same cached object**

**highted cons:**
It may be difficult to unit test the client code of the Singleton because many test frameworks rely on inheritance when producing mock objects. Since the constructor of the singleton class is private and overriding static methods is impossible in most languages, you will need to think of a creative way to mock the singleton. Or just don’t write the tests. Or don’t use the Singleton pattern.

[ ./instance.ts ](./Instance.ts)

```ts
namespace instance {
  class Singleton {
    private static instance: Singleton;

    private constructor() {}

    public static getInstance(): Singleton {
      if (!Singleton.instance) {
        Singleton.instance = new Singleton();
      }

      return Singleton.instance;
    }

    public someBusinessLogic() {
      return "someBusinessHappened";
    }
  }

  function clientCode() {
    const s1 = Singleton.getInstance();
    const s2 = Singleton.getInstance();

    if (s1 === s2) {
      console.log("Singleton works, both variables contain the same instance.");
    } else {
      console.log("Singleton failed, variables contain different instances.");
    }
  }

  clientCode();
}
```

[ ./FancyLogger.ts ](./FancyLogger.ts)

```ts
namespace fancyLogger {
  class FancyLogger {
    private logs: string[] = [];

    constructor() {}

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
```

[./SingletonDatabase](./SingletonDatabase)

```ts
import https from "https";

namespace database {
  interface IFetcher {
    get(url: string, resp: any): void;
  }

  export class SingletonDatabase {
    private constructor(private data: any) {}
    private static instance: SingletonDatabase;

    static async init(dbSourceURL: string, fetcher: IFetcher = https) {
      return new Promise<SingletonDatabase>((resolve, reject) => {
        https.get(dbSourceURL, resp => {
          let data = "";

          resp.on("data", chunk => {
            data += chunk;
          });

          resp.on("end", () => {
            if (!SingletonDatabase.instance) {
              SingletonDatabase.instance = new SingletonDatabase(
                JSON.parse(data),
              );
            }

            resolve(SingletonDatabase.instance);
          });

          resp.on("error", err => {
            reject(err);
          });
        });
      });
    }

    get(id: any) {
      return this.data[id];
    }
  }
}

namespace demo {
  (async () => {
    const { SingletonDatabase } = database;

    const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

    const singletonDatabase = await SingletonDatabase.init(TODOS_URL);

    const firstTodo = singletonDatabase.get(0);
  })();
}
```

### Monostate

Monostate is just syntactic sugar around Singleton

```ts
namespace monostate {
  export class Foo {
    private static _data: string;

    get data(): string {
      return Foo._data;
    }

    set data(value: string) {
      Foo._data = value;
    }
  }
}

namespace demo {
  const { Foo } = monostate;

  const f1 = new Foo();
  const f2 = new Foo();

  f1.data = "good";

  console.log(f2.data); // good
}
```
