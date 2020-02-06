import fs from "fs";

interface IPersistAble {
  toString(): string;
}

class Journal implements IPersistAble {
  private entries: string[] = [];

  addJournal(journal: string): void {
    this.entries.push(journal);
  }

  removeJourney(idx: number) {
    this.entries.slice(idx);
  }

  toString(): string {
    return this.entries.join("\n");
  }
}

class Persister {
  static save(obj: IPersistAble, filePath: string): void {
    fs.writeFile(filePath, obj.toString(), () => {
      console.info("Successfully save %s", filePath);
    });
  }
}

const journal = new Journal();

journal.addJournal("I Cried");
journal.addJournal("I ate a bug");

Persister.save(journal, "./myJournals.txt");
