class Shape {
  constructor(public height: number, public width: number) {}

  public get isSquare(): boolean {
    return this.height === this.width;
  }

  setHeight = (height: number) => {
    if (this.isSquare) {
      this.width = height;
    }

    this.height = height;
  };

  setWidth = (width: number) => {
    if (this.isSquare) {
      this.height = width;
    }

    this.width = width;
  };

  public get area(): number {
    return this.height * this.width;
  }
}

class RectAngle extends Shape {}

class Square extends Shape {}

const increaseShapeSize = (shape: RectAngle | Square) => {
  shape.setWidth(shape.width + 1);
};

const rectAngleOne = new RectAngle(5, 10);
const rectAngleTwo = new RectAngle(5, 5);
const rectAngleThree = new Square(5, 5);

increaseShapeSize(rectAngleOne);
increaseShapeSize(rectAngleTwo);
increaseShapeSize(rectAngleThree);

console.log(rectAngleOne.area, rectAngleTwo.area, rectAngleThree.area); // 55 36 36
