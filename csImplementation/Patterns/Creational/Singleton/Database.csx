interface IDatabase
{
    int GetPopulation(string city);
}

class SingletonDatabase : IDatabase
{
    Dictionary<string, int> capitals = new Dictionary<string, int>();

    private static Lazy<SingletonDatabase> instance = new Lazy<SingletonDatabase>(() => new SingletonDatabase());
    public static SingletonDatabase Instance => instance.Value;
    private SingletonDatabase()
    {
        string[] lines = File.ReadAllLines("capitals.txt");

        foreach (string line in lines)
        {
            string[] splittedLine = line.Split('-');

            capitals.Add(splittedLine[0], int.Parse(splittedLine[2]));
        }

    }

    public int GetPopulation(string city)
    {
        return capitals[city];
    }
}

SingletonDatabase db = SingletonDatabase.Instance;
Console.WriteLine(db.GetPopulation("Berlin"))