using System.Collections.Generic;

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

interface IRecordFinder
{
    int GetTotalPopulation(IEnumerable<string> cities);
}

class SingletonRecordFinder : IRecordFinder
{
    public int GetTotalPopulation(IEnumerable<string> cities)
    {
        int result = 0;

        foreach (string city in cities)
        {
            int pop = SingletonDatabase.Instance.GetPopulation(city);

            if (pop > 0)
            {
                result += pop;

            }
        }
        return result;
    }

}

class ConfigureAbleRecordFinder : IRecordFinder
{
    private IDatabase database;
    public int GetTotalPopulation(IEnumerable<string> cities)
    {
        int result = 0;

        foreach (string city in cities)
        {
            int pop = database.GetPopulation(city);

            if (pop > 0)
            {
                result += pop;

            }
        }
        return result;
    }

    public ConfigureAbleRecordFinder(IDatabase database) // DI
    {
        this.database = database;
    }
}

class DummyDB : IDatabase
{
    public int GetPopulation(string city)
    {
        return new Dictionary<string, int>
        {
            ["alpha"] = 1,
            ["beta"] = 2,
            ["gamma"] = 3,
        }[city];
    }
}


SingletonDatabase db = SingletonDatabase.Instance;
SingletonDatabase db2 = SingletonDatabase.Instance;

if (db == db2)
{
    Console.WriteLine("dbs refers to the same object");
}
SingletonRecordFinder srf = new SingletonRecordFinder();
Console.WriteLine(srf.GetTotalPopulation(new[] { "Berlin", "Madrid", "Paris" }));

ConfigureAbleRecordFinder crf = new ConfigureAbleRecordFinder(new DummyDB());
Console.WriteLine(crf.GetTotalPopulation(new[] { "alpha", "beta", "gamma" }));