using System.Collections.Generic;

class Person : ICloneable
{
    public List<string> Names = new List<string>();
    public Address address;

    public Person(List<string> names, Address address)
    {
        Names = names;
        this.address = address;
    }

    public object Clone()
    {
        return new Person(Names, (Address)address.Clone());
    }

    public override string ToString()
    {
        return $"Name: {string.Join(" ", Names)}, Address: {address}";
    }
}

class Address : ICloneable
{
    public string StreetName;
    public int HouseNumber;

    public Address(string streetName, int houseNumber)
    {
        StreetName = streetName;
        HouseNumber = houseNumber;
    }

    public object Clone()
    {
        return new Address(StreetName, HouseNumber);
    }

    public override string ToString()
    {
        return $"StreetName: {StreetName}, HouseNumber: {HouseNumber}";
    }
}


Address add = new Address("123L", 123);
List<string> names = new List<string> { "Foo", "Bar" };
Person person = new Person(names, add);

Person np = (Person)person.Clone();
np.Names = new List<string> { "Bar", "Foo" };
np.address.HouseNumber = 321;

Console.WriteLine(person);
Console.WriteLine(np);
