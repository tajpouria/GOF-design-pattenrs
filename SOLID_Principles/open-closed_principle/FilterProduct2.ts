namespace filetProduct2 {
  enum ColorType {
    Green,
    Blue,
  }

  enum SizeType {
    Small,
    Big,
  }

  interface ISpecification<T> {
    isSatisfying(p: T): boolean;
  }

  interface IFilter<T> {
    filter(
      products: Array<T>,
      specification: ISpecification<T>,
    ): Array<Product>;
  }

  class Product {
    constructor(
      public name: string,
      public color: ColorType,
      public size: SizeType,
    ) {}
  }

  class AndSpecification implements ISpecification<Product> {
    constructor(
      private sp1: ISpecification<Product>,
      private sp2: ISpecification<Product>,
    ) {}

    isSatisfying(p: Product): boolean {
      return this.sp1.isSatisfying(p) && this.sp2.isSatisfying(p);
    }
  }

  class ColorSpecification implements ISpecification<Product> {
    constructor(private color: ColorType) {}

    isSatisfying(pr: Product): boolean {
      return pr.color == this.color;
    }
  }

  class SizeSpecification implements ISpecification<Product> {
    constructor(private size: SizeType) {}

    isSatisfying(pr: Product): boolean {
      return pr.size == this.size;
    }
  }

  class Filter implements IFilter<Product> {
    filter(
      products: Product[],
      specification: ISpecification<Product>,
    ): Array<Product> {
      // @ts-ignore
      return (function*() {
        for (let pr of products) {
          if (specification.isSatisfying(pr)) return yield pr;
        }
      })();
    }
  }

  const products = ([
    ["Apple", ColorType.Green, SizeType.Small],
    ["Tree", ColorType.Green, SizeType.Big],
    ["House", ColorType.Blue, SizeType.Big],
  ] as [string, ColorType, SizeType][]).map(
    ([prName, prColor, prSize]) => new Product(prName, prColor, prSize),
  );

  for (let pr of new Filter().filter(
    products,
    new AndSpecification(
      new ColorSpecification(ColorType.Green),
      new SizeSpecification(SizeType.Big),
    ),
  )) {
    console.info(`- ${pr.name} is green and big`);
  }
}
