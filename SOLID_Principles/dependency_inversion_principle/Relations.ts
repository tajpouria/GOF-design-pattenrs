export {};

enum RelationType {
  Parent,
  Child,
}

class Person {
  constructor(public name: string) {}
}

interface IRelationBrowser {
  findAllChildrenOf(person: Person): Array<Person>;
}

type PersonRelationPerson = [Person, RelationType, Person];

class Relations implements IRelationBrowser {
  private _relations: Array<PersonRelationPerson> = [];

  public addParentChildRelation(p1: Person, p2: Person) {
    this._relations.push([p1, RelationType.Parent, p2]);
    this._relations.push([p2, RelationType.Child, p1]);
  }

  public findAllChildrenOf(person: Person): Person[] {
    const { _relations } = this;

    const res: Person[] = [];
    for (let pr of _relations) {
      const [p0, rel, p2] = pr;

      if (p0.name === person.name && rel === RelationType.Parent) res.push(p2);
    }

    return res;
  }
}

class FindAllChildResearch {
  public static research(person: Person, relations: Relations) {
    relations.findAllChildrenOf(person).forEach(child => {
      console.info(`${person.name} have a child named ${child.name}`);
    });
  }
}

const [p0, p1, p2] = ["John", "Paul", "Janet"].map(p => new Person(p));

const rls = new Relations();

rls.addParentChildRelation(p0, p1);
rls.addParentChildRelation(p0, p2);

FindAllChildResearch.research(p0, rls);
