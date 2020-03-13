export {};

class HandleHeldInventory {
  constructor(public left: any = null, public right: any = null) {}

  public [Symbol.iterator](): HandleHeldInventoryIterator {
    return new HandleHeldInventoryIterator(this);
  }
}

enum Hand {
  Left,
  Right,
  None,
}

class HandleHeldInventoryIterator {
  private current = Hand.Left;

  constructor(private handheldInventory: HandleHeldInventory) {}

  public next(): { done: boolean; value?: any } {
    switch (this.current) {
      case Hand.Left:
        this.current = Hand.Right;

        return { done: false, value: this.handheldInventory.left };

      case Hand.Right:
        this.current = Hand.None;

        return { done: false, value: this.handheldInventory.right };

      default:
        return { done: true };
    }
  }
}

const hands = new HandleHeldInventory("foo", "bar");

for (let item of hands) {
  console.log(item); // foo, bar
}
