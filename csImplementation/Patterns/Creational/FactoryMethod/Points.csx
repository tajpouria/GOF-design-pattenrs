class Point
{
    public double x, y;
    public static Point NewCartesianPoint(double x, double y)
    {
        return new Point(x, y);
    }


    public static Point NewPolarPoint(double rho, double theta)
    {
        return new Point(rho * Math.Cos(theta), rho * Math.Sin(theta));
    }

    public Point(double x, double y)
    {
        this.x = x;
        this.y = y;
    }

    public override string ToString()
    {
        return $"x:{x}, y:{y}";
    }
}

Point cp = Point.NewCartesianPoint(1, 2);
Point pp = Point.NewPolarPoint(1, 2);

Console.WriteLine(cp);
Console.WriteLine(pp);
