# Factories

A component responsible for solely the wholesale(not piecewise) creation of object

- [Factory Method](#method)
- [Abstract Factory](#abstract)

## <a name="method"></a>Factory Method

![Factory Method](https://refactoring.guru/images/patterns/content/factory-method/factory-method.png)

Factory Method is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.

The Factory Method pattern suggests that you replace direct object construction calls (using the new operator) with calls to a special factory method. Don’t worry: the objects are still created via the new operator, but it’s being called from within the factory method. Objects returned by a factory method are often referred to as “products.”

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

// With factory method pattern
class PointFactory {
  public x?: number;
  public y?: number;

  public rho?: number;
  public theta?: number;

  newCartesianPoint(x: number, y: number) {
    (this.x = x), (this.y = y);
  }

  newPolarPoint(rho: number, theta: number) {
    (this.rho = rho), (this.theta = theta);
  }
}
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

## <a name="abstract"></a>Abstract Factory
