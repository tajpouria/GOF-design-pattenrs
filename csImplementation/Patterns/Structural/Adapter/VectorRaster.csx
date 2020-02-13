using System;
using System.Collections.ObjectModel;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Security.AccessControl;

class Point
{
    public int X, Y;

    public Point(int x, int y)
    {
        X = x;
        Y = y;
    }
}

class Line
{
    public Point Start, End;

    public Line(Point a, Point b)
    {
        this.Start = a;
        this.End = b;
    }
}

class VectorObject : Collection<Line>
{
}

class VectorRectangle : VectorObject
{
    public VectorRectangle(int x, int y, int width, int height)
    {
        Add(new Line(new Point(x, y), new Point(x + width, y)));
        Add(new Line(new Point(x + width, y), new Point(x + width, y + height)));
        Add(new Line(new Point(x, y), new Point(x, y + height)));
        Add(new Line(new Point(x, y + height), new Point(x + width, y + height)));
    }
}


class Drawer
{

    public static void DrawPoint(Point p)
    {
        Console.Write(".");
    }
}

class LineToPointAdapter : List<Point>
{
    private static int count = 0;

    public LineToPointAdapter(Line line)
    {


        Console.WriteLine($"{++count}- Generating points form line [{line.Start.X}, {line.Start.Y}]-[{line.End.X}, {line.End.Y}]");

        int left = Math.Min(line.Start.X, line.End.X);
        int right = Math.Max(line.Start.X, line.End.X);
        int top = Math.Min(line.Start.Y, line.End.Y);
        int bottom = Math.Max(line.Start.Y, line.End.Y);
        int dx = right - left;
        int dy = line.End.Y - line.Start.Y;

        if (dx == 0)
        {
            for (int y = top; y <= bottom; ++y)
            {
                Add(new Point(left, y));
            }
        }
        else if (dy == 0)
        {
            for (int x = left; x <= right; ++x)
            {
                Add(new Point(x, top));
            }
        }
    }

}

List<VectorObject> vectorObjects = new List<VectorObject>{
    new VectorRectangle(1,1,10,10),
    new VectorRectangle(2,3,10,15),
};

foreach (VectorObject vo in vectorObjects)
{
    foreach (Line line in vo)
    {
        LineToPointAdapter adapter = new LineToPointAdapter(line);
        adapter.ForEach(Drawer.DrawPoint);
    }

}