using System.Collections.Generic;

enum Color
{
    green, blue
}

enum Size
{
    big, small
}


class Product
{
    public string name;
    public Size size;
    public Color color;

    public Product(string name, Size size, Color color)
    {
        this.size = size;
        this.color = color;
        this.name = name;
    }
}

class ProductFilter
{
    public IEnumerable<Product> FilterBySize(IEnumerable<Product> products, Size size)
    {
        foreach (Product pr in products)
        {
            if (pr.size == size)
                yield return pr;
        }
    }

    // Modifying existing ProductFilter is violintion of OCP
    public IEnumerable<Product> FilterByColor(IEnumerable<Product> products, Color color)
    {
        foreach (Product pr in products)
        {
            if (pr.color == color)
                yield return pr;
        }
    }

}

interface ISpecification<T>
{
    bool IsSatisfying(T p);
}

interface IFilter<T>
{
    IEnumerable<T> Filter(IEnumerable<T> items, ISpecification<T> spec);
}

class ProductColorSpecification : ISpecification<Product>
{
    private Color color;
    public ProductColorSpecification(Color color)
    {
        this.color = color;
    }

    public bool IsSatisfying(Product p)
    {
        return p.color == color;
    }
}

class ProductSizeSpecification : ISpecification<Product>
{
    private Size size;

    public ProductSizeSpecification(Size size)
    {
        this.size = size;
    }

    bool ISpecification<Product>.IsSatisfying(Product p)
    {
        return p.size == size;
    }
}

class ProductAndSpecification : ISpecification<Product>
{
    private ISpecification<Product> sp1;
    private ISpecification<Product> sp2;

    public ProductAndSpecification(ISpecification<Product> sp1, ISpecification<Product> sp2)
    {
        this.sp1 = sp1;
        this.sp2 = sp2;
    }

    public bool IsSatisfying(Product p)
    {
        return sp1.IsSatisfying(p) && sp2.IsSatisfying(p);
    }
}

class BetterProductFilter : IFilter<Product>
{
    public IEnumerable<Product> Filter(IEnumerable<Product> items, ISpecification<Product> spec)
    {
        foreach (Product pr in items)
        {
            if (spec.IsSatisfying(pr))
            {
                yield return pr;
            }
        }
    }
}



Product apple = new Product("Apple", Size.small, Color.green);
Product tree = new Product("Tree", Size.big, Color.green);
Product house = new Product("House", Size.big, Color.blue);

List<Product> products = new List<Product> { apple, tree, house };

ProductFilter pf = new ProductFilter();

pf.FilterBySize(products, Size.big);

Console.WriteLine("Big Produces (ProductFilter)");
foreach (Product pr in pf.FilterBySize(products, Size.big))
{
    Console.WriteLine($"- {pr.name} is Big");
}


BetterProductFilter bpf = new BetterProductFilter();

Console.WriteLine("Green Products (BetterFilter)");
foreach (Product pr in bpf.Filter(products, new ProductColorSpecification(Color.green)))
{
    Console.WriteLine($"- {pr.name} is green  ");
}

Console.WriteLine("Green And Big Proudcts(BetterFilter)");
foreach (Product pr in bpf.Filter(products, new ProductAndSpecification(
        new ProductColorSpecification(Color.green),
        new ProductSizeSpecification(Size.big))))
{
    Console.WriteLine($"- {pr.name} is green and big");
}
