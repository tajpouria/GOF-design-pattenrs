namespace bridgeShape {
  enum ColorTypes {
    "red",
    "green",
  }

  interface IColorImplementation {
    color: ColorTypes;
  }

  abstract class Shape {
    constructor(protected colorImplementation: IColorImplementation) {}
  }

  class RedColorImplementation implements IColorImplementation {
    public color = ColorTypes.red;
  }

  class GreenColorImplementation implements IColorImplementation {
    public color = ColorTypes.green;
  }

  class Circle extends Shape {
    constructor(
      private radius: number,
      colorImplementation: IColorImplementation,
    ) {
      super(colorImplementation);
    }
  }

  class Square extends Shape {
    constructor(
      private dim: number,
      colorImplementation: IColorImplementation,
    ) {
      super(colorImplementation);
    }
  }

  const greenCir = new Circle(10, new GreenColorImplementation());
  const redCir = new Circle(10, new RedColorImplementation());
}
