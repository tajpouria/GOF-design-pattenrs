interface Builder {
  producePartA(): Builder;
  producePartB(): Builder;
  producePartC(): Builder;
}

class ConcertBuilder implements Builder {
  private product?: Product;

  constructor() {
    this.reset();
  }

  private reset() {
    this.product = new Product();
  }

  public producePartA() {
    this.product?.parts.push("PartA1");
    return this;
  }

  public producePartB() {
    this.product?.parts.push("PartB1");
    return this;
  }

  public producePartC() {
    this.product?.parts.push("PartC1");
    return this;
  }

  getProduct() {
    const result = this.product;
    this.reset();
    return result;
  }
}

interface IProduct {
  parts: string[];
  listParts: () => string;
}

class Product implements IProduct {
  public parts: string[] = [];

  public listParts(): string {
    return `Product contains ${this.parts.join(", ")} \n`;
  }
}

class Director {
  private _builder?: Builder;

  set builder(builder: Builder) {
    this._builder = builder;
  }

  buildMinimalVisibleProduct() {
    this._builder?.producePartA();
  }

  builderFullFeatureProduct() {
    this._builder
      ?.producePartA()
      .producePartB()
      .producePartC();
  }
}

function clientCode(director: Director) {
  const builder = new ConcertBuilder();

  director.builder = builder;

  director.buildMinimalVisibleProduct();
  console.info(builder.getProduct()?.listParts());

  director.builderFullFeatureProduct();
  console.info(builder.getProduct()?.listParts());
}

clientCode(new Director());
