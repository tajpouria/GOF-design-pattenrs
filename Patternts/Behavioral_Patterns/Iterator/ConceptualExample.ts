namespace conceptualIterator {
  interface Iterator<T> {
    current: T;
    key: number;
    valid: boolean;
    next(): T;
    rewind(): void;
  }

  interface Aggregator<T> {
    getIterator(): Iterator<T>;
  }

  class AlphabeticalOrderIterator implements Iterator<string> {
    private position = 0;

    constructor(
      private collection: WordCollection,
      private reverse: boolean = false,
    ) {
      if (reverse) {
        this.position = collection.count - 1;
      }
    }

    public get current() {
      return this.collection.items[this.position];
    }

    next() {
      const item = this.collection.items[this.position];

      this.position += this.reverse ? -1 : 1;

      return item;
    }

    public get key() {
      return this.position;
    }

    public get valid(): boolean {
      return this.position < this.collection.count && this.position >= 0;
    }

    rewind(): void {
      this.position = this.reverse ? this.collection.count - 1 : 0;
    }
  }

  export class WordCollection implements Aggregator<string> {
    private _items: string[] = [];
    public get items(): string[] {
      return this._items;
    }

    public addItem(item: string) {
      this._items.push(item);
    }

    public get count() {
      return this.items.length;
    }

    getIterator(): Iterator<string> {
      return new AlphabeticalOrderIterator(this);
    }

    getReverseIterator(): Iterator<string> {
      return new AlphabeticalOrderIterator(this, true);
    }
  }
}

namespace client {
  const { WordCollection } = conceptualIterator;

  const wordCollection = new WordCollection();

  for (const w of "ABCDEFGHIJKLMNOPQRSTUWXYZ") {
    wordCollection.addItem(w);
  }

  const iterator = wordCollection.getIterator();

  const reverseIterator = wordCollection.getReverseIterator();

  while (iterator.valid) {
    console.info(iterator.current);
    iterator.next();
  }

  while (reverseIterator.valid) {
    console.info(reverseIterator.current);
    reverseIterator.next();
  }
}
