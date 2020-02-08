interface IHotDrink
{
    void Consome();
}

internal class Tea : IHotDrink
{
    public void Consome()
    {
        Console.WriteLine("TEA TIME");
    }
}

internal class Coffee : IHotDrink
{
    public void Consome()
    {
        Console.WriteLine("COFFEE TIME");
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

class HotDrinkMachine
{
    public enum AvailableDrink
    {
        Tea,
        Coffee
    }

    private Dictionary<AvailableDrink, IHotDrinkFactory> factories = new Dictionary<AvailableDrink, IHotDrinkFactory>();

    public HotDrinkMachine()
    {
        foreach (AvailableDrink drink in Enum.GetValues(typeof(AvailableDrink)))
        {
            IHotDrinkFactory factory = (IHotDrinkFactory)Activator.CreateInstance(
                Type.GetType(Enum.GetName(typeof(AvailableDrink), drink) + "Factory")
            );
            factories.Add(drink, factory);
        }
    }

    public IHotDrink MakeDrink(AvailableDrink drinkType)
    {
        return factories[drinkType].Prepare();
    }

}

HotDrinkMachine hdm = new HotDrinkMachine();

IHotDrink drink = hdm.MakeDrink(HotDrinkMachine.AvailableDrink.Tea);
drink.Consome();