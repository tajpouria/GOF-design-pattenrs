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
