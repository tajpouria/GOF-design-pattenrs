using System.Runtime.Serialization.Formatters.Binary;

public static T DeepCopyBinary<T>(this T self)
{
    var stream = new MemoryStream();
    var formatter = new BinaryFormatter();
    formatter.Serialize(stream, self);
    stream.Seek(0, SeekOrigin.Begin);
    object copy = formatter.Deserialize(stream);
    stream.Close();
    return (T)copy;
}

[Serializable]
class Person
{
    public List<string> Names = new List<string>();
    public Address address;

    public Person(List<string> names, Address address)
    {
        Names = names;
        this.address = address;
    }

    public override string ToString()
    {
        return $"Name: {string.Join(" ", Names)}, Address: {address}";
    }
}

[Serializable]
class Address
{
    public string StreetName;
    public int HouseNumber;

    public Address(string streetName, int houseNumber)
    {
        StreetName = streetName;
        HouseNumber = houseNumber;
    }

    public override string ToString()
    {
        return $"StreetName: {StreetName}, HouseNumber: {HouseNumber}";
    }
}


Address add = new Address("123L", 123);
List<string> names = new List<string> { "Foo", "Bar" };
Person person = new Person(names, add);

Person np = (Person)DeepCopyBinary(person);
np.Names = new List<string> { "Bar", "Foo" };
np.address.HouseNumber = 321;

Console.WriteLine(person);
Console.WriteLine(np);

