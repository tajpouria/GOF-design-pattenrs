
using System.Collections.Generic;

class Person
{
    public List<string> Names = new List<string>();
    public Address address;

    public Person(List<string> names, Address address)
    {
        Names = names;
        this.address = address;
    }

    public Person(Person targetPerson)
    {
        Names = targetPerson.Names;
        address = new Address(targetPerson.address);
    }

    public override string ToString()
    {
        return $"Name: {string.Join(" ", Names)}, Address: {address}";
    }
}

class Address
{
    public string StreetName;
    public int HouseNumber;

    public Address(string streetName, int houseNumber)
    {
        StreetName = streetName;
        HouseNumber = houseNumber;
    }

    public Address(Address targetAddress)
    {
        StreetName = targetAddress.StreetName;
        HouseNumber = targetAddress.HouseNumber;

    }

    public override string ToString()
    {
        return $"StreetName: {StreetName}, HouseNumber: {HouseNumber}";
    }
}


Address add = new Address("123L", 123);
List<string> names = new List<string> { "Foo", "Bar" };
Person person = new Person(names, add);

Person np = new Person(person);
np.Names = new List<string> { "Bar", "Foo" };
np.address.HouseNumber = 321;

Console.WriteLine(person);
Console.WriteLine(np);
