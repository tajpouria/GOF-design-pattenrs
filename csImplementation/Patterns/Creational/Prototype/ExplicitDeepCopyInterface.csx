using System.Collections.Generic;

interface IDeepCopy<T>
{
    T DeepCopy();
}

class Person : IDeepCopy<Person>
{
    public List<string> Names = new List<string>();
    public Address address;

    public Person(List<string> names, Address address)
    {
        Names = names;
        this.address = address;
    }

    public Person DeepCopy()
    {
        return new Person(Names, (Address)address.DeepCopy());
    }

    public override string ToString()
    {
        return $"Name: {string.Join(" ", Names)}, Address: {address}";
    }
}

class Address : IDeepCopy<Address>
{
    public string StreetName;
    public int HouseNumber;

    public Address(string streetName, int houseNumber)
    {
        StreetName = streetName;
        HouseNumber = houseNumber;
    }

    public Address DeepCopy()
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

Person np = (Person)person.DeepCopy();
np.Names = new List<string> { "Bar", "Foo" };
np.address.HouseNumber = 321;

Console.WriteLine(person);
Console.WriteLine(np);

