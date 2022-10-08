class Animal {
  constructor(name, type, foodType, swim) {
    this.name = name;
    this.type = type;
    this.foodType = foodType;
    this.swimmable = swim;
    this.foodLevel = Math.floor(Math.random() * 100)
    this.init();

  }
  init() {
    console.log(`${this.name} in ${this.type} added and it's foodType is ${this.foodType}`, `FoodLevel: ${this.foodLevel}`);
  }
  
}
class Mammal extends Animal {
  // constructor(name, type, foodType, swim) {
  //   super(name, type, foodType, swim);
  // }

  
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

/** TYPES */
const types = {
  Mammal: ["Cat", "Lion", "Fox", "Rabbit", "Sheep"],
  Bird: ["Chicken", "Penguin", "Duck"],
  Raptile: ["Dino"]
};
const foodTypes = {
  Omnivore : ["Cat", "Duck"],
  Herbivore : ["Chicken", "Rabbit", "Sheep"],
  Carnivore : ["Dino", "Fox", "Lion", "Penguin"]
}
const swimmable = ["cat", "Lion", "Fox", "Penguin", "Duck"];


/** FUNCTIONS */
let toggleAddForm = false;
let toggleRemoveForm = false;

function toggleForm(e) {
  const value = e.target.textContent;
  toggleElements[value].classList.add("show");
}

function determineFoodType(type) {
  let foodType;

  if (foodTypes.Omnivore.includes(type)) foodType = "Omnivore";
  if (foodTypes.Herbivore.includes(type)) foodType = "Herbivore";
  if (foodTypes.Carnivore.includes(type)) foodType = "Carnivore";
  return foodType;
}

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

/** CREATE HTML ELEMENTS */
function createElement(animal) {
  // distructuring
  const {name, type, swimmable, foodType, foodLevel} = animal;
  console.log("HEY", name, type, swimmable, foodType, foodLevel)
}

/** Create Animal Component */
function generateAnimal(e) {
  e.preventDefault();
  const name = animalName.value;
  const type = addSelector.value;
  const foodType = determineFoodType(type);
  if (foodType) {
    let newAnimal = generateClass(name, type, foodType);
    /** APPEND CHILD */
    createElement(newAnimal)
  }

}

/** Remove Animal Component */

/** EVENTLISTENERS */
Object.values(controllerButtons).forEach(button => button.addEventListener("click", toggleForm));

generateButton.addEventListener("click", generateAnimal);

addSelector.addEventListener("change", (e) => { console.log(e.target.value); });