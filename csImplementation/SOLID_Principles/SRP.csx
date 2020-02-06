using System;
using System.Collections.Generic;

class Journal : IPersistable
{
    private readonly List<string> entries = new List<string>();

    public void AddJourney(string journey)
    {
        this.entries.Add(journey);
    }

    public void RemoveJourney(int idx)
    {
        entries.RemoveAt(idx);
    }

    public override string ToString()
    {
        return string.Join(System.Environment.NewLine, entries);
    }

}

interface IPersistable
{
    string ToString();
}

class Persistence
{
    public static void Save(IPersistable obj, string filePath)
    {
        File.WriteAllText(filePath, obj.ToString());
    }
}


Journal journal = new Journal();

journal.AddJourney("I Cried");
journal.AddJourney("I ate bug");

Persistence.Save(journal, "./myJournals.txt");
