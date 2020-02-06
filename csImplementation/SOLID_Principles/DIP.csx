using System;
using System.Collections.Generic;

enum RelationType
{
    Parent,
    Child,
    Sibling
}

class Person
{
    public string Name;
}

interface IRelationsBrowser
{
    IEnumerable<Person> FindAllChildrenOf(Person person);
}

class Relations : IRelationsBrowser
{
    public List<(Person, RelationType, Person)> relations = new List<(Person, RelationType, Person)>();

    public void AddParentAndChild(Person parent, Person child)
    {
        relations.Add((parent, RelationType.Parent, child));
        relations.Add((child, RelationType.Parent, parent));
    }

    public IEnumerable<Person> FindAllChildrenOf(Person person)
    {
        return relations.Where(rel => rel.Item1.Name == person.Name && rel.Item2 == RelationType.Parent).Select(rel => rel.Item3);
    }
}

class Research
{
    /*  Hight lvl Class Research depends on low level class Relations

    public Research(Relations relationsShips)
    {
        var relations = relationsShips.relations;

        foreach (var relation in relations.Where(
        x => x.Item1.Name == "John" &&
        x.Item2 == RelationType.Parent
        ))
        {
            Console.WriteLine($"John has a child called {relation.Item3.Name}");
        }
    }
    */

    public Research(Relations relations, Person person)
    {
        foreach (Person pr in relations.FindAllChildrenOf(person))
        {
            Console.WriteLine($"{person.Name} have a child name {pr.Name}");
        }
    }
}

Person p1 = new Person { Name = "John" };
Person p2 = new Person { Name = "Mary" };
Person p3 = new Person { Name = "Angela" };

Relations rls = new Relations();
rls.AddParentAndChild(p1, p2);
rls.AddParentAndChild(p1, p3);

Research rsc = new Research(rls, p1);