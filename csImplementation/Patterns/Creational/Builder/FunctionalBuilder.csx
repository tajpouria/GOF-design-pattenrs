class Person
{
    public string Name, Position;

    public override string ToString()
    {
        return $"Name:{Name}, Position:{Position}";
    }
}

class PersonBuilder
{
    private Person person = new Person();
    public readonly List<Action<Person>> Actions = new List<Action<Person>>();

    public PersonBuilder Called(string name)
    {
        Actions.Add(p => { p.Name = name; });

        return this;
    }

    public Person Build()
    {
        Actions.ForEach(a => a(person));
        return person;
    }
}

class PersonBuilderExtensions
{
    public static PersonBuilder WorksAsA(PersonBuilder builder, string position)
    {
        builder.Actions.Add(p => { p.Position = position; });
        return builder;
    }
}


PersonBuilder pb = new PersonBuilder();
Person per = PersonBuilderExtensions.WorksAsA(pb, "Bar").Called("Foo").Build();
Console.WriteLine(per);