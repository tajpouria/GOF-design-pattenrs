interface IRenderer
{
    void RenderCircle(float radius);
}

class VectorRendered : IRenderer
{
    public void RenderCircle(float radius)
    {
        Console.WriteLine($"Drawing a circle of radius {radius}");
    }
}

class RasterRendere : IRenderer
{
    public void RenderCircle(float radius)
    {
        Console.WriteLine($"Drawing a pixels of an circle with radius {radius} ");
    }
}

abstract class Shape
{
    protected IRenderer Renderer;

    protected Shape(IRenderer renderer)
    {
        Renderer = renderer;
    }

    public abstract void Draw();
    public abstract void Resize(float factor);
}

class Circle : Shape
{
    public float radius;

    public Circle(IRenderer renderer, float radius) : base(renderer)
    {
        this.radius = radius;
    }

    public override void Draw()
    {
        Renderer.RenderCircle(radius);
    }

    public override void Resize(float factor)
    {
        radius *= factor;
    }
}

IRenderer vectorRendered = new VectorRendered();
Circle circle = new Circle(vectorRendered, 10);

circle.Draw();
circle.Resize(2);
circle.Draw();