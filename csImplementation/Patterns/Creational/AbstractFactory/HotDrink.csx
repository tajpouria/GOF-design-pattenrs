interface IHotDrink
{
    void Consome();
}

internal class Tea : IHotDrink
{
    public void Consome()
    {
        throw new NotImplementedException();
    }
}

internal class Coffee : IHotDrink
{
    public void Consome()
    {
        throw new NotImplementedException();
    }
}

interface IHotDrinkFactory
{
    IHotDrink Prepare();
}

class TeaFactory : IHotDrinkFactory
{
    public IHotDrink Prepare()
    {
        return new Tea();
    }
}

class CoffeeFactory : IHotDrinkFactory
{
    public IHotDrink Prepare()
    {
        return new Coffee();
    }
}