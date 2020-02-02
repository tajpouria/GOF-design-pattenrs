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
