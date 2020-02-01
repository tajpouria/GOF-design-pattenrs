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
