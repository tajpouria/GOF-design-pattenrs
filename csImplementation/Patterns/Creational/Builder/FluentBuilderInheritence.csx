using System;
class Person
{
    public string Name;
    public string Position;

    public class Builder : PeronJobBuilder<Builder>
    {
    }

    public static Builder New => new Builder();


    public override string ToString()
    {
        return $"Name: {Name}, Position: {Position}";
    }
}

abstract class PersonBuilder
{
    protected Person person = new Person();

    public Person Build()
    {
        return person;
    }

}

class PersonInfoBuilder<SELF> : PersonBuilder
where SELF : PersonInfoBuilder<SELF>
{

    public SELF Called(string name)
    {
        person.Name = name;
        return (SELF)this;
    }
}

class PeronJobBuilder<SELF> : PersonInfoBuilder<PeronJobBuilder<SELF>>
where SELF : PeronJobBuilder<SELF>

{
    public SELF WorksAt(string position)
    {
        person.Position = position;
        return (SELF)this;
    }
}

var foobar = Person.New.Called("Foo").WorksAt("Bar").Build();
Console.WriteLine(foobar);