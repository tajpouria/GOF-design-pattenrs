import { readFile, writeFile } from "fs";
import { resolve } from "path";

namespace database {
  interface IDatabase {
    getPopulation(cityName: string): number | undefined;
  }

  const path = resolve(__dirname, "./capitals.txt");

  class Database implements IDatabase {
    private static instance: Database;

    public static Instance(): Promise<Database> | Database {
      if (this.instance) {
        return this.instance;
      }

      return new Promise((resolve, reject) => {
        readFile(path, "utf8", (err, data) => {
          if (err) throw reject(err);

          const capitals = new Map();

          data.split("\n").map(line => {
            const [capitalName, population] = line.split("-");

            capitals.set(capitalName, parseInt(population));
          });

          this.instance = new Database(capitals);

          resolve(this.instance);
        });
      });
    }

    private constructor(private capitals: Map<string, number>) {}

    public getPopulation(cityName: string): number | undefined {
      return this.capitals.get(cityName);
    }

    /**
     * Write a bunch of new city population into database
     * @param citiesWithPopulation sets of [cityName, cityPopulation]
     */
    public writePopulation(
      citiesWithPopulation: [string, number][],
    ): Promise<string> {
      citiesWithPopulation.forEach(([city, population]) => {
        this.capitals.set(city, population);
      });

      let data = "";
      this.capitals.forEach((cityPopulation, cityName) => {
        data += `${cityName}-${cityPopulation}\n`;
      });

      return new Promise((resolve, reject) => {
        writeFile(path, data, err => {
          if (err) reject(err);

          resolve(data);
        });
      });
    }
  }

  class RecordFinder {
    constructor(private db: IDatabase) {} // DI

    public GetTotalPopulation(cities: string[]): number | undefined {
      return cities
        .map(city => this.db.getPopulation(city))
        .reduce((acc, pop) => {
          if (typeof pop === "number") return <number>acc + pop;
          return 0;
        }, 0);
    }
  }

  class DummyDatabase implements IDatabase {
    private db = { alpha: 1, beta: 2, gamma: 3 };

    getPopulation(cityName: string): number | undefined {
      // @ts-ignore
      return this.db[cityName];
    }
  }

  (async () => {
    const db = await Database.Instance();
    const db2 = await Database.Instance();

    if (db === db2) {
      console.log("dbs refers to the same object");
    }

    console.log(db.getPopulation("Berlin"));
    console.log(db.getPopulation("Texas"));

    const rf = new RecordFinder(new DummyDatabase());

    console.log(rf.GetTotalPopulation(["alpha", "beta", "gamma"]));
  })();
}
