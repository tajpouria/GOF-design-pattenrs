# SOLID design principles

These principles, make it easy for a programmer to develop software that are easy to maintain and extend. They also make it easy for developers to avoid code smells, easily refactor code, and are also a part of the agile or adaptive software development.

## Single responsibility principle

### A class should have one, and only one reason to change

You don’t need to limit your thinking to classes when considering the SRP. You can apply the principle to methods or modules, ensuring that they do just one thing and therefore have just one reason to change. In most of case using **separation of concern** term :

./single_responsibility_principle/calorieTracker.ts

```ts
// bad way

class BadCalorieTracker {
  private receivedCalorie = 0;
  constructor(private calorieLimit: number) {}

  track(calorieToAdd: number) {
    this.receivedCalorie += calorieToAdd;

    if (this.receivedCalorie >= this.calorieLimit) {
      console.log("You passed allowed calorie limitation.");
    }
  }
}

// right way
class RightCalorieTracker {
  private receivedCalorie = 0;
  constructor(private calorieLimit: number) {}

  track(calorieToAdd: number) {
    this.receivedCalorie += calorieToAdd;

    if (this.receivedCalorie >= this.calorieLimit) {
      alertCaloriePassed();
    }
  }
}

function alertCaloriePassed() {
  console.log("You passed allowed calorie limitation.");
}
```

## Open/closed principle

### Software entities should be open for extensions but closed for modification

Almost every time you saw a huge switch/case stateMent or if/else you breaking this principle

./open-closed_principle/QuestionPrinter.ts

```ts
// bad approach

interface Question {
  question: string;
  type: "bool" | "option" | "range";
  answers?: string[];
}

const badPrintQuiz = (quiz: Question[]) => {
  quiz.forEach(q => {
    console.log(q.question);

    switch (q.type) {
      case "bool":
        console.log("True");
        console.log("False");
        break;

      case "option":
        q.answers?.forEach(answer => console.log(answer));
        break;

      case "range":
        console.log(`MIN ${q.answers?.[0]}`);
        console.log(`MAX ${q.answers?.[1]}`);
        break;

      default:
        console.log("Question type is not defined");
    }
  });
};

const badQuiz: Question[] = [
  { type: "bool", question: "Bool Question?" },
  {
    type: "option",
    question: "Option Question?",
    answers: ["A", "B", "C", "D"],
  },
  { type: "range", question: "Range Question?", answers: ["100", "200"] },
  // { type: "text", question: "What's your name?" }
];

badPrintQuiz(badQuiz);

// right approach

interface QuestionWrapper {
  question: string;
  printAnswers(): void;
}

class BoolQuestion implements QuestionWrapper {
  constructor(public question: string) {}

  public printAnswers = () => {
    console.info("True");
    console.info("False");
  };
}

class OptionQuestion implements QuestionWrapper {
  constructor(public question: string, public answers: string[]) {}

  public printAnswers = () => {
    this.answers.map(answer => console.info(answer));
  };
}

class RangeQuestion implements QuestionWrapper {
  constructor(public question: string, public ranges: number[]) {}

  public printAnswers = () => {
    console.info(`MIN ${this.ranges[0]}`);
    console.info(`MAX ${this.ranges[1]}`);
  };
}

class TextQuestion implements QuestionWrapper {
  constructor(public question: string) {}

  public printAnswers = () => {
    console.info("___________");
  };
}

const goodPrintQuiz = (quiz: QuestionWrapper[]) => {
  quiz.forEach(q => {
    console.log(q.question);
    q.printAnswers();
  });
};

const goodQuiz = [
  new BoolQuestion("Bool Question?"),
  new OptionQuestion("Option Question?", ["A", "B", "C", "D"]),
  new RangeQuestion("Range Question?", [10, 20]),
  new TextQuestion("Text Question"),
];

goodPrintQuiz(goodQuiz);
```

## Liskov substitution principle

### If S is subtype of T, then objects of type T may be replaced with object of type S

Essentially that's mean every where you use a class you should be able to replace it by it's subClasses and it's should works just fine

./liskov_subsections_principle/Shape.ts

```ts
// bad approach

class RectAngle {
  constructor(public height: number, public width: number) {}

  setHeight = (height: number) => {
    this.height = height;
  };

  setWidth = (width: number) => {
    this.width = this.height = width;
  };

  public get area(): number {
    return this.height * this.width;
  }
}

class Square extends RectAngle {
  setHeight = (height: number) => {
    this.height = height;
    this.width = height;
  };

  setWidth = (width: number) => {
    this.width = this.height = width;
  };
}

const increaseRectAngleSize = (rectAngle: RectAngle | Square) => {
  rectAngle.setWidth(rectAngle.width + 1);
};

const rectAngleOne = new RectAngle(5, 10);
const rectAngleTwo = new RectAngle(5, 5);
const rectAngleThree = new Square(5, 5);

increaseRectAngleSize(rectAngleOne);
increaseRectAngleSize(rectAngleTwo);
increaseRectAngleSize(rectAngleThree);

console.log(rectAngleOne.area, rectAngleTwo.area, rectAngleThree.area); // 55 30 36

// right approach

class Shape {
  constructor(public height: number, public width: number) {}

  public get isSquare(): boolean {
    return this.height === this.width;
  }

  setHeight = (height: number) => {
    if (this.isSquare) {
      this.width = height;
    }

    this.height = height;
  };

  setWidth = (width: number) => {
    if (this.isSquare) {
      this.height = width;
    }

    this.width = width;
  };

  public get area(): number {
    return this.height * this.width;
  }
}

class RectAngle extends Shape {}

class Square extends Shape {}

const increaseShapeSize = (shape: RectAngle | Square) => {
  shape.setWidth(shape.width + 1);
};

const rectAngleOne = new RectAngle(5, 10);
const rectAngleTwo = new RectAngle(5, 5);
const rectAngleThree = new Square(5, 5);

increaseShapeSize(rectAngleOne);
increaseShapeSize(rectAngleTwo);
increaseShapeSize(rectAngleThree);

console.log(rectAngleOne.area, rectAngleTwo.area, rectAngleThree.area); // 55 36 36
```

## Interface segregation principle

### Client should not depends on methods that not use

./interface_segregation_principle/Entity.ts

```ts
// bad approach

class BadEntity {
  public health = 100;

  constructor(public name: string) {}

  public move() {
    console.info("Moving");
  }

  public attack() {
    console.info("Attacking");
  }

  public hasDamage(damageValue: number) {
    this.health -= damageValue;
    console.info(`${this.name} has ${this.health}% health remaining`);
  }
}

class Character extends BadEntity {}

class Turret extends BadEntity {
  move() {
    return null;
  }

  attack() {
    return null;
  }
}

// right approach

class RightEntity {
  public health = 100;

  constructor(public name: string) {}
}

const mover = {
  move() {
    console.info("Moving");
  },
};

const attacker = {
  attack() {
    console.info("Attack");
  },
};

const damageTracker = {
  hadDamage(damageValue: number) {
    // @ts-ignore
    this.health -= damageValue;
    // @ts-ignore
    console.info(`${this.name} has ${this.health}% health remaining`);
  },
};

class NewCharacter extends RightEntity {}

Object.assign(NewCharacter.prototype, mover);
Object.assign(NewCharacter.prototype, attacker);
Object.assign(NewCharacter.prototype, damageTracker);

class NewTurret extends RightEntity {}

Object.assign(NewTurret.prototype, damageTracker);

console.log(NewCharacter.prototype);
console.log(NewTurret.prototype);
```

## Dependency inversion principle

### High-level modules should not depend on low-level modules. Both should depend on abstractions (e.g. interfaces).

### Abstractions should not depend on details. Details (concrete implementations) should depend on abstractions.

./dependency_inversion_principle/Payment.ts

```ts
// bad Pattern

class Stripe {
  constructor(public userName: string) {}

  applyPayment(cashInCent: number) {
    console.info(`${this.userName} payed ${cashInCent}`);
  }
}

class Paypal {
  applyPayment(userName: string, cashInDollar: number) {
    console.info(`${userName} payed ${cashInDollar}`);
  }
}

class BadStore {
  private stripe: Stripe;

  private userName: string;
  private paypal = new Paypal();

  constructor(userName: string) {
    this.stripe = new Stripe(userName);

    this.userName = userName;
  }

  buyHamlet(quantity: number) {
    this.stripe.applyPayment((quantity * 10) / 100);
    this.paypal.applyPayment(this.userName, quantity * 10);
  }
}

// right pattern

class StripePaymentProcessor {
  private stripe: Stripe;

  constructor(private userName: string) {
    this.stripe = new Stripe(userName);
  }

  pay(cash: number) {
    this.stripe.applyPayment(cash / 100);
  }
}

class PaypalPaymentProcessor {
  private payPal = new Paypal();

  constructor(private userName: string) {}

  pay(cash: number) {
    this.payPal.applyPayment(this.userName, cash);
  }
}

class RightStore {
  constructor(
    private paymentProcessor: StripePaymentProcessor | PaypalPaymentProcessor,
  ) {}

  buyHamlet(quantity: number) {
    this.paymentProcessor.pay(quantity & 10);
  }
}
```
