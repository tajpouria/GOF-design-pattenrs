// bad approach

enum Color {
  orange,
  green,
}

enum Size {
  small,
  big,
}

interface Product {
  color: Color;
  size: Size;
}

class BadFilter {
  public static filterByColor(products: Product[], targetColor: Color) {
    return products.map(p => {
      if (p.color === targetColor) return p;
    });
  }

  public static filterBySize(products: Product[], targetSize: Size) {
    return products.map(p => {
      if (p.size === targetSize) return p;
    });
  }
}

// right approach

interface Specification {
  isSatisfying(p: Product): boolean;
}

type Satisfier = string;

class FilerSpecification<T> implements Specification {
  constructor(private satisfier: keyof Product, private targetSatisfier: T) {}

  public isSatisfying = (product: Product) =>
    // @ts-ignore
    product[this.satisfier] === this.targetSatisfier;
}

class BetterFiler {
  public static filter(products: Product[], specification: Specification) {
    return products.map(p => {
      if (specification.isSatisfying(p)) return p;
    });
  }
}

const filteredProducts = BetterFiler.filter(
  [{ color: Color.green, size: Size.big }],
  new FilerSpecification<Color>("color", Color.green),
);
