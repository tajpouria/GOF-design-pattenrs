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
