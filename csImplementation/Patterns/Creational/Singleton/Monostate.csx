class CEO
{
    private static string name;
    private static int age;

    public string Name
    {
        get => name;
        set => name = value;
    }

    public int Age
    {
        get => age;
        set => age = value;
    }

    public override string ToString()
    {
        return $"{nameof(Name)}: {Name}, {nameof(Age)}: {Age}";
    }
}

CEO ceo = new CEO();
ceo.Name = "Foo";
ceo.Age = 55;

CEO ceo2 = new CEO();
Console.WriteLine(ceo2);