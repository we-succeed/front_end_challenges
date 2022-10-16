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
        foodType: "Omnivore",
        swimmable: "Yes",
        foodLevel: 15,
        list: {}
      },
      Fox: {
        species: "Mammal",
        foodType: "Omnivore",
        swimmable: "Yes",
        foodLevel: 20,
        list: {}
      },
      Rabbit: {
        species: "Mammal",
        foodType: "Omnivore",
        swimmable: "Yes",
        foodLevel: 40,
        list: {}
      },
      Sheep: {
        species: "Mammal",
        foodType: "Omnivore",
        swimmable: "Yes",
        foodLevel: 30,
        list: {}
      },
      Chicken: {
        species: "Mammal",
        foodType: "Omnivore",
        swimmable: "Yes",
        foodLevel: 50,
        list: {}
      },
      Penguin: {
        species: "Mammal",
        foodType: "Omnivore",
        swimmable: "Yes",
        foodLevel: 35,
        list: {}
      },
      Duck: {
        species: "Mammal",
        foodType: "Omnivore",
        swimmable: "Yes",
        foodLevel: 35,
        list: {}
      },
      Dino: {
        species: "Mammal",
        foodType: "Omnivore",
        swimmable: "Yes",
        foodLevel: 5,
        list: {}
      },
    };
  }
  /** getter cannot have parameters */
  get list() {
    return this.#animalList;
  }
  set add(animal) {
    this.#animalList[animal.type].list[animal.name] = { isAlive: true };
    console.log("ADDED", animal, this.#animalList);
  }

  isExist(animal) {
    return this.list[animal.type].list[animal.name]?.isAlive;
  }

  getDetails(animal) {
    const { species, foodType, swimmable } = this.list[animal.type];
    return { species, foodType, swimmable };
  }

  set remove(animal) {

  }

  feed(animal) {
    const foodLevel = this.list[animal.type].foodLevel;
    animal.eat = foodLevel;
  }
  clear() {

  }
}

class Animal {
  #dead;
  constructor(type, name) {
    // super();

    this.name = name;
    this.type = type;
    this.foodLevel = Math.floor(Math.random() * 30) + 30;
    this.color = "blue";
    this.#dead = false;
    this.init();
  }

  init() {
    // super.add = this; // setter
    // const lists = super.list;
    // console.log(lists);
  }
  set eat(lev) {
    console.log(lev)
    this._foodLevel += lev;
  }
  // get name() {
  //   return this._name;
  // }
  // set name(newName) {
  //   newName = newName.trim();
  //   if (newName === '') {
  //     throw 'The name cannot be empty';
  //   }
  //   this._name = newName;
  // }
  // init() {
  //   console.log(`${this.name} in ${this.type} added and it's foodType is ${this.foodType}`, `FoodLevel: ${this.foodLevel}`);
  //   this.updateStatus();
  // }

  // setFoodLevel() {
  //   let initialLevel = Math.floor(Math.random() * 30) + 30; // min 30% to max 60%
  //   return initialLevel;
  // }

  // updateStatus() {
  //   const interval = setInterval(() => {
  //     this.foodLevel -= 2;
  //     if (this.foodLevel <= 0) {
  //       this.dead();
  //       this.foodLevel = 0;
  //       clearInterval(interval);
  //     }
  //     if (this.foodLevel >= 50) this.color = "blue";
  //     if (this.foodLevel < 50) this.color = "orange";
  //     if (this.foodLevel < 25) this.color = "red";
  //   }, 500);
  // }

  // dead() {
  //   this.#dead = true;
  //   console.log(`${this.name} is dead`);
  // }
}

export class Mammal extends Animal { }
export class Fish extends Animal { }
export class Raptile extends Animal { }
