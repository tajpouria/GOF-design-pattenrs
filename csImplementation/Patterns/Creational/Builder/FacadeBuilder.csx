using System;

class Person
{
    public string StreetAddres, PostCode, City, CompanyName, Postion;
    public int AnnualIncome;

    public override string ToString()
    {
        return $"StreetAddres: {StreetAddres}, PostCode: {PostCode}, City: {City}, CompanyName: {CompanyName}, Postion: {Postion}, AnnualIncome: {AnnualIncome}";
    }
}

// Facade
class PersonBuilder
{
    // ref
    protected Person person = new Person();

    public static implicit operator Person(PersonBuilder pb)
    {
        return pb.person;
    }

    public PersonJobBuilder Job => new PersonJobBuilder(person);
    public PersonAddressBuilder Address => new PersonAddressBuilder(person);

}

class PersonJobBuilder : PersonBuilder
{
    public PersonJobBuilder(Person person)
    {
        this.person = person;
    }

    public PersonJobBuilder At(string companyName)
    {
        person.CompanyName = companyName;
        return this;
    }

    public PersonJobBuilder As(string postion)
    {
        person.Postion = postion;
        return this;
    }

    public PersonJobBuilder With(int annualIncome)
    {
        person.AnnualIncome = annualIncome;
        return this;
    }
}

class PersonAddressBuilder : PersonBuilder
{
    public PersonAddressBuilder(Person person)
    {
        this.person = person;
    }

    public PersonAddressBuilder OnCity(string city)
    {
        person.City = city;
        return this;
    }

    public PersonAddressBuilder PostCode(string postCode)
    {
        person.PostCode = postCode;
        return this;
    }

    public PersonAddressBuilder Street(string streetAddres)
    {
        person.StreetAddres = streetAddres;
        return this;
    }
}

Person pr = new PersonBuilder().Job.At("Google")
                                   .As("Dev")
                                   .With(12000)
                                   .Address
                                   .OnCity("Yuks")
                                   .PostCode("12z-31s")
                                   .Street("Manhattan");

Console.WriteLine(pr);