class Foo
{
    private Foo()
    {
    }

    public static async Task<Foo> Init()
    {
        await Task.Delay(1000);
        return new Foo();
    }

    public override string ToString()
    {
        return "Successfully initialzed";

    }
}

Foo bar = await Foo.Init();

Console.WriteLine(bar);