// bad approach

class Bird {
  fly() {
    console.info("Flying");
  }

  swim() {
    console.info("Swimming");
  }
}

class Dock extends Bird {}

class Pigeon extends Bird {
  fly() {
    throw new Error("I Cannot fly.");
  }
}

const makeBirdFly = (bird: Bird) => {
  bird.fly();
};

makeBirdFly(new Dock());
makeBirdFly(new Pigeon()); // throw Error

//better approach

class FlyingBird {
  fly() {
    console.info("Flying");
  }
}

class SwimmingBird {
  swim() {
    console.info("Swimming");
  }
}

class NewDock extends FlyingBird {}

const makeFlyingBirdFly = (bird: FlyingBird) => {
  bird.fly();
};

const makeSwimmingBirdSwim = (bird: SwimmingBird) => {
  bird.swim();
};

makeFlyingBirdFly(new Dock());
makeSwimmingBirdSwim(new Pigeon());
