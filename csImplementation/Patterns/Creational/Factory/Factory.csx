
class Point
{
    public double x, y;
    public Point(double x, double y)
    {
        this.x = x;
        this.y = y;
    }

    public override string ToString()
    {
        return $"x:{x}, y:{y}";
    }

    public static class Factroy
    {
        public static Point NewCartesianPoint(double x, double y)
        {
            return new Point(x, y);
        }


        public static Point NewPolarPoint(double rho, double theta)
        {
            return new Point(rho * Math.Cos(theta), rho * Math.Sin(theta));
        }

    }
}


Point cp = Point.Factroy.NewCartesianPoint(1, 2);
Point pp = Point.Factroy.NewPolarPoint(1, 2);

Console.WriteLine(cp);
Console.WriteLine(pp);