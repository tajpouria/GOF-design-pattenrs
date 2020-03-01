export {};

interface Subject {
  observers: Map<string, Observer>;
  registerObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notify(): void;
}

export interface Observer {
  name: string;
  update(notification: number): void;
}

export namespace weatherStation {
  export class WeatherStation implements Subject {
    private _temperature = 78;
    public get temperature() {
      return this._temperature;
    }
    public set temperature(value) {
      this._temperature = value;
      this.notify();
    }

    observers: Map<string, Observer> = new Map();

    registerObserver(observer: Observer, override = false): void {
      if (this.observers.has(observer.name) && !override)
        throw new Error(
          "Observer is already exist either not set it or provide override flag",
        );
      this.observers.set(observer.name, observer);
    }

    removeObserver(observer: Observer): void {
      this.observers.delete(observer.name);
    }

    notify(): void {
      this.observers.forEach(observer => observer.update(this.temperature));
    }
  }
}

namespace observer {
  export class ConcreteTemperatureDisplay implements Observer {
    name: string = "ConcreteTemperatureDisplay ";

    update(notification: number): void {
      console.info(this.name, notification);
    }
  }

  export class ConcreteFan implements Observer {
    name: string = "ConcreteFan";

    update(notification: number): void {
      this.autoCheck(notification);
    }

    private autoCheck(temperature: number) {
      temperature >= 80
        ? console.info(this.name, "Turning on the fan")
        : console.info(this.name, "Turning off the fan");
    }
  }
}

namespace clientCode {
  const { WeatherStation } = weatherStation;
  const { ConcreteFan, ConcreteTemperatureDisplay } = observer;

  const ws = new WeatherStation();

  ws.registerObserver(new ConcreteFan());
  ws.registerObserver(new ConcreteTemperatureDisplay());

  ws.temperature = 80;
  setTimeout(() => (ws.temperature = 75), 3000);
  ws.temperature = 75;
}
