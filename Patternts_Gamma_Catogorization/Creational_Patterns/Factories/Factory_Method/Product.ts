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
