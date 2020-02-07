export {};

interface IPerson {
  getName(): string;
}

class Villager implements IPerson {
  getName() {
    return "Villager Person";
  }
}

class CityPerson implements IPerson {
  getName() {
    return "City Person";
  }
}

enum PersonType {
  Rural,
  Urban,
}

class PersonFactory {
  static getPerson(personType: PersonType) {
    switch (personType) {
      case PersonType.Rural:
        return new Villager();

      case PersonType.Urban:
        return new CityPerson();

      default:
        break;
    }
  }
}

const villager = PersonFactory.getPerson(PersonType.Rural);
