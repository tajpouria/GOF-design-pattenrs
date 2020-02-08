namespace point2 {
  class Point {
    private constructor(private x: number, private y: number) {}

    static Factory = class Factory {
      public static newCartesianPoint(x: number, y: number): Point {
        return new Point(x, y);
      }

      public static newPolarPoint(rho: number, theta: number): Point {
        return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
      }
    };
  }

  const cp = Point.Factory.newCartesianPoint(1, 2);
  const pp = Point.Factory.newPolarPoint(1, 2);
}
