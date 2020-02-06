using System;

class RectAngle
{
    public virtual int width { set; get; }
    public virtual int height { set; get; }

    public override string ToString()
    {
        return $"{nameof(width)}: {width}, {nameof(height)}: {height}";
    }
}

class Square : RectAngle
{
    public override int width
    {
        set
        {
            base.width = base.height = value;
        }
    }

    public override int height
    {
        set
        {
            base.height = base.width = value;
        }
    }
}

class Calculator
{
    public static int Area(RectAngle rect) => rect.height * rect.width;
}

RectAngle rect = new RectAngle();
rect.width = 10;
rect.height = 5;

RectAngle sq = new Square();
sq.width = 10;


Console.WriteLine($"{rect}, Area:{Calculator.Area(rect)}");
Console.WriteLine($"{sq}, Area:{Calculator.Area(sq)}");
