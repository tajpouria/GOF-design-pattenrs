namespace point2 {
  class Point {
    private constructor(private x: number, private y: number) {}

    public static newCartesianPoint(x: number, y: number): Point {
      return new Point(x, y);
    }

    public static newPolarPoint(rho: number, theta: number): Point {
      return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
    }
  }

  const cp = Point.newCartesianPoint(1, 2);
  const pp = Point.newPolarPoint(1, 2);
}
