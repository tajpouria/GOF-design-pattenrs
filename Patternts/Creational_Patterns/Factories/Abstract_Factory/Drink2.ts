namespace hotDrinkAbstractFactory {
  interface IHotDrink {
    consume(): void;
  }

  class Tea implements IHotDrink {
    consume(): void {
      console.log("Tea time");
    }
  }

  class Coffee implements IHotDrink {
    consume(): void {
      console.log("Coffee time");
    }
  }

  interface IHotDrinkFactory {
    prepare(): IHotDrink;
  }

  class TeaFactory implements IHotDrinkFactory {
    prepare(): IHotDrink {
      return new Tea();
    }
  }

  class CoffeeFactory implements IHotDrinkFactory {
    prepare(): IHotDrink {
      return new Coffee();
    }
  }

  class HotDrinkAbstractFactory {
    static availableDrinks = { Tea: TeaFactory, Coffee: CoffeeFactory };

    private factories = new Map();

    constructor() {
      Object.keys(HotDrinkAbstractFactory.availableDrinks).forEach(drink => {
        this.factories.set(
          drink,
          // @ts-ignore
          HotDrinkAbstractFactory.availableDrinks[drink],
        );
      });
    }

    makeDrink(drink: string): IHotDrink {
      const res = this.factories.get(drink);
      const fac = new res();
      return fac.prepare();
    }
  }

  const hdf = new HotDrinkAbstractFactory();
  const drink = hdf.makeDrink("Tea");
  drink.consume();
}
