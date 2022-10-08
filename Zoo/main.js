class Animal {
  constructor(name, type, foodType, swim) {
    this.name = name;
    this.type = type;
    this.foodType = foodType;
    this.swimmable = swim;
  }
  about() {
    console.log(`Name: ${this.name}, Type: ${this.type}, Sound: ${this.sound}`);
  }
}
class Herbivore extends Animal {

}

class Omnivore extends Animal {

}

class Carnivore extends Animal {

}

// class Aquatic extends Animal {
//   constructor(name, type, foodType) {
//     super(name, type);
//     console.log("FT", foodType);
//     this.foodType = foodType;
//     this.init();
//   }
//   init() {
//     console.log(`${this.name} in ${this.type} added and it's foodType is ${this.foodType}`);
//   }
// }

class Mammal extends Animal {
  // constructor(name, type, foodType, swim) {
    // super();
    // this.foodType = foodType;
    // this.swim = swim;
    // this.init();
  // }
  init() {
    console.log(`${this.name} in ${this.type} added and it's foodType is ${this.foodType}`);
  }
}

class Bird extends Animal {

}

class Raptile extends Animal {

}


/** GET ELEMENTS */

/** Get main element */
const main = document.querySelector("main");
const controllerButtons = {
  add: document.querySelector(".controller_add_btn"),
  revmoe: document.querySelector(".controller_remove_btn")
};

const toggleElements = {
  add: document.querySelector(".animal_lists_container.add"),
  remove: document.querySelector(".animal_lists_container.remove")
};

const generateButton = document.querySelector(".button_generate");

const addSelector = document.querySelector(".animal_lists");
const animalName = document.querySelector(".new_animal_name");
/** FUNCTIONS */
let toggleAddForm = false;
let toggleRemoveForm = false;

function toggleForm(e) {
  const value = e.target.textContent;
  toggleElements[value].classList.add("show");
}

function determineFoodType(type) {
  let foodType;
  switch (type) {
    case "Cat" || "Duck":
      foodType = "Omnivore";
      break;
    case "Chicken" || "Rabbit" || "Sheep":
      foodType = "Herbivore";
      break;
    case "Dino" || "Fox" || "Lion" || "Penguin":
      foodType = "Carnivore";
      break;
    default:
      return;
  }
  return foodType;
}
/** TYPES */
const types = {
  Mammal: ["Cat", "Lion", "Fox", "Rabbit", "Sheep"],
  Bird: ["Chicken", "Penguin", "Duck"],
  Raptile: ["Dino"]
};

const swimmable = ["cat", "Lion", "Fox", "Penguin", "Duck"];


/** GENERATE CLASS */
function generateClass(name, type, foodType) {
  /** Type Groups */
  const canSwim = swimmable.includes(type) ? "Yes" : "No";

  let newAnimal;
  if (types.Mammal.includes(type)) newAnimal = new Mammal(name, type, foodType, canSwim);
  if (types.Bird.includes(type)) newAnimal = new Bird(name, type, foodType, canSwim);
  if (types.Raptile.includes(type)) newAnimal = new Raptile(name, type, foodType, canSwim);
  return newAnimal;
}

/** Create Animal Component */
function generateAnimal(e) {
  e.preventDefault();
  const name = animalName.value;
  const type = addSelector.value;
  const foodType = determineFoodType(type);
  if (foodType) {
    let newAnimal = generateClass(name, type, foodType);
    console.log("NEWANIMAL", newAnimal)
  }

}

/** Remove Animal Component */

/** EVENTLISTENERS */
Object.values(controllerButtons).forEach(button => button.addEventListener("click", toggleForm));

generateButton.addEventListener("click", generateAnimal);

addSelector.addEventListener("change", (e) => { console.log(e.target.value); });