/** Class Zoo **/
export class Zoo {
  #animalList;
  constructor() {
    this.#animalList = {
      Cat: {
        species: "Mammal",
        foodType: "Omnivore",
        swimmable: "Yes",
        foodLevel: 40,
        list: {}

      },
      Lion: {
        species: "Mammal",
        foodType: "Carnivore",
        swimmable: "Yes",
        foodLevel: 15,
        list: {}
      },
      Fox: {
        species: "Mammal",
        foodType: "Carnivore",
        swimmable: "Yes",
        foodLevel: 20,
        list: {}
      },
      Rabbit: {
        species: "Mammal",
        foodType: "Herbivore",
        swimmable: "No",
        foodLevel: 40,
        list: {}
      },
      Sheep: {
        species: "Mammal",
        foodType: "Herbivore",
        swimmable: "Yes",
        foodLevel: 30,
        list: {}
      },
      Chicken: {
        species: "Bird",
        foodType: "Herbivore",
        swimmable: "No",
        foodLevel: 50,
        list: {}
      },
      Penguin: {
        species: "Bird",
        foodType: "Carnivore",
        swimmable: "Yes",
        foodLevel: 35,
        list: {}
      },
      Duck: {
        species: "Mammal",
        foodType: "Carnivore",
        swimmable: "Yes",
        foodLevel: 35,
        list: {}
      },
      Dino: {
        species: "Raptile",
        foodType: "Carnivore",
        swimmable: "No",
        foodLevel: 7,
        list: {}
      },
    };
    this.deads = [];
  }
  /** getter cannot have parameters */
  get list() {
    return this.#animalList;
  }

  /** setter parameter is from... animal.add = `this` */
  set add(animal) {
    this.#animalList[animal.type].list[animal.name] = { isAlive: true };
  }

  isExist(animal) {
    return this.list[animal.type].list[animal.name]?.isAlive;
  }

  returnSpecies(animal) {
    return this.list[animal.type].species;
  }

  getDetails(animal) {
    const { species, foodType, swimmable } = this.list[animal.type];
    return { species, foodType, swimmable };
  }

  set remove(animal) {
    delete this.list[animal.type].list[animal.name];
    animal.dead = true;
  }

  feed(animal) {
    const foodLevel = this.list[animal.type].foodLevel;
    animal.eat = foodLevel;
  }

  // animal remove button
  set dead(animal) {
    this.list[animal.type].list[animal.name].isAlive = false;
    this.deads.push(animal);
  }
  /** loop deads array and delete */

  doClear() {
    this.deads.forEach(animal => this.remove = animal);
    this.deads = [];
  }
}

/** Class Animal **/
class Animal {
  #dead;
  constructor(type, name) {
    this.name = name;
    this.type = type;
    this.foodLevel = Math.floor(Math.random() * 30) + 30;
    this.color = "blue";
    this.#dead = false;
    this.init();
  }

  init() {
    console.log(`${this.name} in ${this.type} added`);
    this.updateStatus();
  }

  set eat(lev) {
    if (this.foodLevel + lev >= 100) return console.log(`${this.name} does not want to eat`);
    this.foodLevel += lev;
  }

  updateStatus() {
    const interval = setInterval(() => {
      // setInterval(() => {
      this.foodLevel -= .5;
      if (this.isDead) {
        clearInterval(interval);
        console.log("CLEAR")
      }
      if (this.foodLevel <= 0) {
        this.dead = true;
        this.foodLevel = 0;
        clearInterval(interval);
      }
      if (this.foodLevel >= 50) this.color = "blue";
      if (this.foodLevel < 50) this.color = "orange";
      if (this.foodLevel < 25) this.color = "red";
    }, 200);
  }

  get isDead() {
    return this.#dead;
  }

  set dead(isDead) {
    this.#dead = isDead;
    console.log(`${this.name}(in ${this.type}) is dead`);
  }
}

export class Mammal extends Animal { }
export class Bird extends Animal { }
export class Raptile extends Animal { }
