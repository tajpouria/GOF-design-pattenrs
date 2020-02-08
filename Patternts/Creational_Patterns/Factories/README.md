# Factories

A component responsible for solely the wholesale(not piecewise) creation of object

- [Factory](#fac)
- [Factory Method](#method)
- [Abstract Factory](#abstract)

## <a name="fac"></a>Factory

```ts
namespace point2 {
  class Point {
    constructor(private x: number, private y: number) {}
  }

  class PointFactory {
    public static newCartesianPoint(x: number, y: number): Point {
      return new Point(x, y);
    }

    public static newPolarPoint(rho: number, theta: number): Point {
      return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
    }
  }

  const cp = PointFactory.newCartesianPoint(1, 2);
  const pp = PointFactory.newPolarPoint(1, 2);
}

// Refactoring in order to use private constructor
namespace point2 {
  class Point {
    private constructor(private x: number, private y: number) {}

    static Factory = class Factory {
      public static newCartesianPoint(x: number, y: number): Point {
        return new Point(x, y);
      }

      public static newPolarPoint(rho: number, theta: number): Point {
        return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
      }
    };
  }

  const cp = Point.Factory.newCartesianPoint(1, 2);
  const pp = Point.Factory.newPolarPoint(1, 2);
}
```

## <a name="method"></a>Factory Method

![Factory Method](https://refactoring.guru/images/patterns/content/factory-method/factory-method.png)

Factory Method is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.

The Factory Method pattern suggests that you replace direct object construction calls (using the new operator) with calls to a special factory method. Don’t worry: the objects are still created via the new operator, but it’s being called from within the factory method. Objects returned by a factory method are often referred to as “products.”

**Factory-Method can be recognized by creation methods, which return object from concrete classes, but return them as objects of abstract type or interface**

[./Point.ts](./Factory_Method/Point.ts)

```ts
/* 
  Create a class responsible to creating either cartesian or polar point
  Without factory method 
*/
class Point {
  public x?: number;
  public y?: number;

  public rho?: number;
  public theta?: number;

  constructor(
    a: number,
    b: number,
    public pointType: PointTypeEnum = PointTypeEnum.cartesian,
  ) {
    if (pointType === PointTypeEnum.cartesian) {
      this.x = a;
      this.y = b;
    } else {
      this.rho = a * Math.cos(b);
      this.theta = b * Math.sin(a);
    }
  }
}

enum PointTypeEnum {
  cartesian,
  polar,
}

// With factory method pattern ./Point2.ts
class Point {
  private constructor(private x: number, private y: number) {}

  public static newCartesianPoint(x: number, y: number): Point {
    return new Point(x, y);
  }

  public static newPolarPoint(rho: number, theta: number): Point {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  }
}

const cp = Point.newCartesianPoint(1, 2);
const pp = Point.newPolarPoint(1, 2);
```

[./Creator.ts](./Factory_Method/Creator.ts)

```ts
export {};

abstract class Creator {
  public abstract factoryMethod(): Product;

  someOperation() {
    const product = this.factoryMethod();

    return `Creator: The same creator's code has just worked with ${product.operation()}`;
  }
}

class ConcreteCreator1 extends Creator {
  factoryMethod() {
    return new ConcreteProduct1();
  }
}

class ConcreteCreator2 extends Creator {
  factoryMethod() {
    return new ConcreteProduct2();
  }
}

interface Product {
  operation(): string;
}

class ConcreteProduct1 implements Product {
  operation() {
    return `Result of ConcreteProduct1`;
  }
}

class ConcreteProduct2 implements Product {
  operation() {
    return `Result of ConcreteProduct2`;
  }
}

function clientCode(creator: Creator) {
  console.info(creator.someOperation());
}

clientCode(new ConcreteCreator1());

clientCode(new ConcreteCreator2());
```

[./Person.ts](./Factory_Method/Person.ts)

```ts
export {};

interface IPerson {
  getName(): string;
}

class Villager implements IPerson {
  getName() {
    return "Villager Person";
  }
}

class CityPerson implements IPerson {
  getName() {
    return "City Person";
  }
}

enum PersonType {
  Rural,
  Urban,
}

class PersonFactory {
  static getPerson(personType: PersonType) {
    switch (personType) {
      case PersonType.Rural:
        return new Villager();

      case PersonType.Urban:
        return new CityPerson();

      default:
        break;
    }
  }
}

const villager = PersonFactory.getPerson(PersonType.Rural);
```

[ ./Product.ts ](./Factory_Method/Product.ts)

```ts
export {};

interface IProduct {
  getName(): string;
  setPrice(price: number): string;
}

class Phone implements IProduct {
  private _price?: number;

  getName() {
    return "Apple touch pad";
  }

  setPrice(price: number) {
    this._price = price;
    return "Success";
  }
}

abstract class ProductFactory {
  protected abstract makeProduct(): IProduct;

  getObject() {
    return this.makeProduct();
  }
}

class PhoneConcreteFactory extends ProductFactory {
  protected makeProduct() {
    const product = new Phone();
    product.setPrice(10);

    return product;
  }
}

const phoneFactory = new PhoneConcreteFactory();

const phone = phoneFactory.getObject();

console.info(phone);
```

## Async Factory method

```ts
namespace asyncFactory {
  class Foo {
    private constructor() {}

    public toString() {
      return "Successfully initialized";
    }

    public static async init(): Promise<Foo> {
      return new Promise(resolve =>
        setTimeout(() => {
          return resolve(new Foo());
        }, 1000),
      );
    }
  }

  Foo.init().then(res => console.log(res.toString()));
}
```

## <a name="abstract"></a>Abstract Factory

Abstract Factory is a creational design pattern that lets you produce families of related objects without specifying their concrete classes.

![Abstract factory](https://refactoring.guru/images/patterns/content/abstract-factory/abstract-factory.png)

**The pattern is easy to recognize by methods, which return a factory object; Then the factory object is used for creating specific sub-component**

[./Abstract_Factory/Drink.ts](./Abstract_Factory/Drink.ts)

```ts
export {};

interface HotDrink {
  prepare(volume: number): string;
}

// A family of products _Drink_
class Tea implements HotDrink {
  prepare(volume: number) {
    return `Take a teabag, boil water, pour ${volume} ml, add some lemon\n`;
  }
}

class Coffee implements HotDrink {
  prepare(volume: number) {
    return `Grind some beans, boil water, pour ${volume}, ml, add cream, enjoy!\n`;
  }
}

// Abstract factory
interface HotDrinkFactory<T> {
  make(): T;
}

// Corresponding factory
class TeaFactory implements HotDrinkFactory<Tea> {
  make(): HotDrink {
    return new Tea();
  }
}

class CoffeeFactory implements HotDrinkFactory<Coffee> {
  make(): HotDrink {
    return new Coffee();
  }
}

enum HotDrinkType {
  Tea,
  Coffee,
}

class DrinkFactory {
  private hotFactories = new Map<HotDrinkType, HotDrinkFactory<Tea | Coffee>>();

  constructor() {
    this.reset();
  }

  private reset() {
    this.hotFactories.set(HotDrinkType.Tea, new TeaFactory());
    this.hotFactories.set(HotDrinkType.Coffee, new CoffeeFactory());
  }

  makeDrink(hotDrinkType: HotDrinkType, volume: number) {
    const drinkFactory = this.hotFactories.get(hotDrinkType);

    if (drinkFactory) {
      return drinkFactory.make().prepare(volume);
    }
  }
}

function clientCode() {
  const df = new DrinkFactory();

  const tea = df.makeDrink(HotDrinkType.Tea, 200);
  const coffee = df.makeDrink(HotDrinkType.Coffee, 200);

  console.info(tea, coffee);
}

clientCode();

/**
 * DrinkFactory{ makeDrink(drinkType) => TeaFactory{ make => Tea{ prepare } }       }
 *             {                      => CoffeeFactory{ make => Coffee{ prepare } } }
 */
```

[./Abstract_Factory/Product.ts](./Abstract_Factory/Product.ts)

```ts
export {};

interface AbstractFactory {
  createProductA(): AbstractProductA;
  createProductB(): AbstractProductB;
}

class ConcreteFactory1 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ConcreteProductA1();
  }

  createProductB(): AbstractProductB {
    return new ConcreteProductB1();
  }
}

class ConcreteFactory2 implements AbstractFactory {
  createProductA(): AbstractProductA {
    return new ConcreteProductA2();
  }

  createProductB(): AbstractProductB {
    return new ConcreteProductB2();
  }
}

interface AbstractProductA {
  usefulFunctionA(): string;
}

class ConcreteProductA1 implements AbstractProductA {
  usefulFunctionA() {
    return "The result of product A1\n";
  }
}

class ConcreteProductA2 implements AbstractProductA {
  usefulFunctionA() {
    return "The result of product A2\n";
  }
}

interface AbstractProductB {
  usefulFunctionB(): string;
  anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

class ConcreteProductB1 implements AbstractProductB {
  usefulFunctionB() {
    return "The result of product B1\n";
  }

  anotherUsefulFunctionB(collaborator: AbstractProductA) {
    const result = collaborator.usefulFunctionA();
    return `The result of product B1 collaborating with ( ${result} )\n`;
  }
}

class ConcreteProductB2 implements AbstractProductB {
  usefulFunctionB() {
    return "The result of product B2\n";
  }

  anotherUsefulFunctionB(collaborator: AbstractProductA) {
    const result = collaborator.usefulFunctionA();
    return `The result of product B2 collaborating with ( ${result} )\n`;
  }
}

function clientCode(concreteFactory: AbstractFactory) {
  const productA = concreteFactory.createProductA();
  const productB = concreteFactory.createProductB();

  console.info(
    productA.usefulFunctionA(),
    productB.usefulFunctionB(),
    productB.anotherUsefulFunctionB(productA),
  );
}

clientCode(new ConcreteFactory1());
clientCode(new ConcreteFactory2());
```

[./Abstract_Factory/Car.ts](./Abstract_Factory/Car.ts)

```ts
namespace AbstractFactoryPattern {
  interface ICar {
    numberOfDoors: number;
    start(): boolean;
  }

  interface ICarFactory {
    make: string;
    createCar(carType: CarType): ICar;
  }

  enum CarType {
    Compact,
    Convertible,
  }

  class FordCompactCar implements ICar {
    numberOfDoors = 4;

    start() {
      return true;
    }
  }

  class FordConvertibleCar implements ICar {
    numberOfDoors = 2;

    start() {
      return true;
    }
  }

  class RenaultCompactCar implements ICar {
    numberOfDoors = 4;

    start() {
      return true;
    }
  }

  class RenaultConvertibleCar implements ICar {
    numberOfDoors = 2;

    start() {
      return true;
    }
  }

  class FordCarFactory implements ICarFactory {
    make = "Ford";

    createCar(carType: CarType) {
      switch (carType) {
        case CarType.Compact:
          return new FordCompactCar();

        case CarType.Convertible:
          return new FordConvertibleCar();
      }
    }
  }

  class RenaultCarFactory implements ICarFactory {
    make = "Renault";

    createCar(carType: CarType) {
      switch (carType) {
        case CarType.Compact:
          return new RenaultCompactCar();

        case CarType.Convertible:
          return new RenaultConvertibleCar();
      }
    }
  }

  class CarFactoryProducer {
    static getCarFactory(make: string) {
      switch (make) {
        case "Ford":
          return new FordCarFactory();

        case "Renault":
          return new RenaultCarFactory();
      }
    }
  }

  namespace userCode {
    const fordFactory = CarFactoryProducer.getCarFactory("Ford");

    fordFactory?.createCar(CarType.Compact);
  }
}
```
