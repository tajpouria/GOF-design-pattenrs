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
class PointFactory {
  public x?: number;
  public y?: number;

  public rho?: number;
  public theta?: number;

  newCartesianPoint(x: number, y: number) {
    (this.x = x), (this.y = y);
  }

  newPolarPoint(rho: number, theta: number) {
    (this.rho = rho), (this.theta = theta);
  }
}
