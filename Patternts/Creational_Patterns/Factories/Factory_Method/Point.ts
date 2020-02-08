/* 
  Create a class responsible to creating either cartesian or polar point
  Without factory method 
*/
class Point {
  public x?: number;
  public y?: number;

  public rho?: number;
  public theta?: number;

  constructor(
    a: number,
    b: number,
    public pointType: PointTypeEnum = PointTypeEnum.cartesian,
  ) {
    if (pointType === PointTypeEnum.cartesian) {
      this.x = a;
      this.y = b;
    } else {
      this.rho = a * Math.cos(b);
      this.theta = b * Math.sin(a);
    }
  }
}

enum PointTypeEnum {
  cartesian,
  polar,
}

// With factory method pattern
class Point2 {
  private constructor(private x: number, private y: number) {}

  public static newCartesianPoint(x: number, y: number): Point {
    return new Point(x, y);
  }

  public static newPolarPoint(rho: number, theta: number): Point {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  }
}

const cp = Point2.newCartesianPoint(1, 2);
const pp = Point2.newPolarPoint(1, 2);
