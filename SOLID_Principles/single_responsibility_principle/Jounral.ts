// bad way

class BadJournal {
  public entries: string[] = [];

  public saveJournal: Record<string, string> = {};

  constructor(public title: string) {}

  public addEntry(entry: string) {
    this.entries.push(entry);
  }

  public save() {
    this.entries.map((entry, index) => {
      this.saveJournal[index] = entry;
    });
  }
}

// right way

class RightJournal {
  public entries: string[] = [];

  public saveJournal: Record<string, string> = {};

  constructor(public title: string) {}

  public addEntry(entry: string) {
    this.entries.push(entry);
  }

  public save() {
    Persister.save(this.saveJournal, this.entries);
  }
}

class Persister {
  static save(placeToSave: Record<string, string>, entriesToSave: string[]) {
    return entriesToSave.map((entry, index) => {
      placeToSave[index] = entry;
    });
  }
}
