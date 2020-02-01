//https://dev.to/jsmanifest/the-prototype-pattern-in-javascript-nfo

function Movie(title) {
  this.title = title;
}

const harryPotter = new Movie("Harry Potter");
const rushHour2 = new Movie("Rush Hour 2");
const fastAndFurious = new Movie("Fast And Furious");

console.log(harryPotter.constructor.name);
console.log(rushHour2.constructor.name);
console.log(fastAndFurious.constructor.name);

const Warrior = function(name) {
  this.name = name;
  this.hp = 100;
};

Warrior.prototype.bash = function(target) {
  target.hp -= 15;
};

Warrior.prototype.omniSlash = function(target) {
  if (target.hp < 50) {
    return;
  }

  target.hp -= 50;
};

const sam = new Warrior("Sam");
const leo = new Warrior("Leo");

sam.bash(leo);
