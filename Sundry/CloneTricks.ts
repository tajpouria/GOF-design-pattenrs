namespace root {
  export class Example {
    constructor(public type: string) {}
  }

  export class Customer {
    constructor(public name: string, public example: Example) {}
    public get greet(): string {
      return `Name: ${this.name}, Type: ${this.example.type}\n____________________`;
    }
  }
}

namespace flusher {
  const { Example, Customer } = root;

  export function flush() {
    return new Customer("Foo", new Example("Foo"));
  }
}

/**
  Option 1: Spread

  Properties: Yes
  Methods: No
  Deep Copy: No
 */
namespace spread {
  console.log("Spread");

  const { flush } = flusher;

  const c = flush();

  const clone = { ...c };

  clone.name = "Bar";
  clone.example.type = "Bar";

  console.log(c.greet);
}

/**
  Option 1: Assign

  Properties: Yes
  Methods: No
  Deep Copy: No
 */
namespace spread {
  console.log("Object.assign");

  const { flush } = flusher;

  const c = flush();

  const clone = Object.assign({}, c);

  clone.name = "Bar";
  clone.example.type = "Bar";

  console.log(c.greet);
}

/**
  Option 3: Object.create

  Properties: Yes
  Methods: Yes
  Deep Copy: No
*/
namespace create {
  console.log("Object.create");

  const { flush } = flusher;

  const c = flush();

  const clone = Object.create(c);

  clone.name = "Bar";
  clone.example.type = "Bar";

  console.log(c.greet);
}

/**
  Option 4: JSON.parse(JSON.stringify())

  Properties: Yes
  Methods: Yes
  Deep Copy: Yes
*/
namespace create {
  console.log("JSON.parse(JSON.stringify())");

  const { flush } = flusher;

  const c = flush();

  const clone = JSON.parse(JSON.stringify(c));

  clone.name = "Bar";
  clone.example.type = "Bar";

  console.log(c.greet);
}

/* Option 5: Deep Copy Function

Properties: Yes
Methods: No
Deep Copy: Yes
*/
namespace deepCopyFunc {
  console.log("DeepCopyFunc");

  function deepCopy(obj: any) {
    let copy: any;

    // Handle the 3 simple types, and null or undefined
    if (null === obj || "object" !== typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = deepCopy(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr]);
      }
      return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
  }

  const { flush } = flusher;

  const c = flush();

  const clone = deepCopy(c);

  console.log(c.greet);
}
