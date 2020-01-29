// bad approach

class BadEntity {
  public health = 100;

  constructor(public name: string) {}

  public move() {
    console.info("Moving");
  }

  public attack() {
    console.info("Attacking");
  }

  public hasDamage(damageValue: number) {
    this.health -= damageValue;
    console.info(`${this.name} has ${this.health}% health remaining`);
  }
}

class Character extends BadEntity {}

class Turret extends BadEntity {
  move() {
    return null;
  }

  attack() {
    return null;
  }
}

// right approach

class RightEntity {
  public health = 100;

  constructor(public name: string) {}
}

const mover = {
  move() {
    console.info("Moving");
  },
};

const attacker = {
  attack() {
    console.info("Attack");
  },
};

const damageTracker = {
  hadDamage(damageValue: number) {
    // @ts-ignore
    this.health -= damageValue;
    // @ts-ignore
    console.info(`${this.name} has ${this.health}% health remaining`);
  },
};

class NewCharacter extends RightEntity {}

Object.assign(NewCharacter.prototype, mover);
Object.assign(NewCharacter.prototype, attacker);
Object.assign(NewCharacter.prototype, damageTracker);

class NewTurret extends RightEntity {}

Object.assign(NewTurret.prototype, damageTracker);

console.log(NewCharacter.prototype);
console.log(NewTurret.prototype);
