## Dependency Injection

dependency injection is a technique whereby one object supplies the dependencies of another object

![dependency injection](https://upload.wikimedia.org/wikipedia/commons/1/10/W3sDesign_Dependency_Injection_Design_Pattern_UML.jpg)

[./di.js](./di.js)

```js
function Wheels() {
  this.action = () => console.log("The wheels go 'round and 'round.");

  console.log("Made some wheels.");
}

function Pistons() {
  this.action = () => console.log("The pistons fire up and down.");

  console.log("Made some pistons.");
}

function Engine() {
  this.pistols = new Pistons();

  this.action = () => {
    this.pistols.action();

    console.log("The engine goes vrom vrom.");
  };

  console.log("Made an engine.");
}

function Car() {
  this.wheels = new Wheels();
  this.engine = new Engine();

  this.action = () => {
    this.wheels.action();
    this.engine.action();
    console.log("The car drives by");
  };

  console.log("Made a car.");
}

const car = new Car();

car.action();

// Inject dependencies

function Engine(pistols) {
  this.pistols = pistols;

  this.action = () => {
    this.pistols.action();

    console.log("The engine goes vrom vrom.");
  };

  console.log("Made an engine.");
}

function Car(wheels, engine) {
  this.wheels = wheels;
  this.engine = engine;

  this.action = () => {
    this.wheels.action();
    this.engine.action();
    console.log("The car drives by");
  };

  console.log("Made a car.");
}

const wheels = new Wheels();
const pistons = new Pistons();
const engine = new Engine(pistons);

const Car = new Car(wheels, engine);
```

### Symbol factory function

By specification, object property keys may be either of string type, or of symbol type. Not numbers, not booleans, only strings or symbols, these two types.

A “symbol” represents a unique identifier.

```js
const id = Symbol();
// or
const id = Symbol("symbol's description");
```

Symbols are guaranteed to be `unique`. For instance, here are two symbols with the same description – they are not equal:

```js
let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false
```

Symbols don’t auto-convert to a string

```js
let id = Symbol("id");
alert(id); // TypeError: Cannot convert a Symbol value to a string
alert(id.toString()); // Symbol(id), now it works
alert(id.description); // id
```

Symbols allow us to create “hidden” properties of an object, that no other part of code can accidentally access or overwrite.

```js
const id = Symbol("id");

const user = { [id]: 1 };

alert(user[id]); // Accessing to value by unique key
```

Symbols are skipped by `for…in` or `Object.keys(user)`

```js
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123,
};

for (let key in user) alert(key); // name, age (no symbols)

// the direct access by the symbol works
alert("Direct: " + user[id]);
```

**In contrast, Object.assign copies both string and symbol properties:**

Global symbols

```js
// read from the global registry
let id = Symbol.for("id"); // if the symbol did not exist, it is created

// read it again (maybe from another part of the code)
let idAgain = Symbol.for("id");

// the same symbol
alert(id === idAgain); // true

// get symbol by name
alert(Symbol.keyFor(id)); // id
```
