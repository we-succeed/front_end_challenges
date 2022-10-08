class Animal {
  #dead;
  constructor(name, type, foodType, swim, species) {
    this.name = name;
    this.type = type;
    this.foodType = foodType;
    this.swimmable = swim;
    this.species = species;
    this.foodLevel = this.setFoodLevel();
    this.color = "blue";
    this.#dead = false;
    this.init();
  }

  init() {
    console.log(`${this.name} in ${this.type} added and it's foodType is ${this.foodType}`, `FoodLevel: ${this.foodLevel}`);
    this.updateStatus();
  }

  setFoodLevel() {
    let initialLevel = Math.floor(Math.random() * 30) + 30; // min 30% to max 60%
    return initialLevel;
  }

  updateStatus() {
    const interval = setInterval(() => {
      this.foodLevel -= 1;
      if (this.foodLevel <= 0) {
        this.dead();
        clearInterval(interval)
      }
      if (this.foodLevel >= 50) this.color = "blue";
      if (this.foodLevel < 50) this.color = "orange";
      if (this.foodLevel < 25) this.color = "red";
    }, 500);
  }

  feed() {
    console.log("FEED");
    if (this.foodLevel < 50) this.foodLevel += 30;
  }

  dead() {
    this.#dead = true;
    console.log(`${this.name} is dead`)
  }

}
class Mammal extends Animal { }

class Bird extends Animal { }

class Raptile extends Animal { }


/**************** GET ELEMENTS *******************/

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
/** PARENT */
const animalContainer = document.querySelector(".animals_container");

/** GAGUE */
const gauge = document.querySelector(".gauge");



/**************** TYPES *******************/
const types = {
  Mammal: ["Cat", "Lion", "Fox", "Rabbit", "Sheep"],
  Bird: ["Chicken", "Penguin", "Duck"],
  Raptile: ["Dino"]
};
const foodTypes = {
  Omnivore: ["Cat", "Duck"],
  Herbivore: ["Chicken", "Rabbit", "Sheep"],
  Carnivore: ["Dino", "Fox", "Lion", "Penguin"]
};
const swimmable = ["cat", "Lion", "Fox", "Penguin", "Duck"];


/**************** FUNCTIONS *******************/
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
  if (types.Mammal.includes(type)) newAnimal = new Mammal(name, type, foodType, canSwim, "Mammal");
  if (types.Bird.includes(type)) newAnimal = new Bird(name, type, foodType, canSwim, "Bird");
  if (types.Raptile.includes(type)) newAnimal = new Raptile(name, type, foodType, canSwim, "Raptile");
  return newAnimal;
}

/** CREATE HTML ELEMENTS */
function createElement(animal) {
  // distructuring
  const { name, type, swimmable, foodType, foodLevel, species, color } = animal;
  console.log("HEY", name, type, swimmable, foodType, foodLevel, species, color);
  // parent = class("animals_container")
  /** CHILD */
  const child = document.createElement("div");
  child.setAttribute("class", name);
  child.innerHTML = `
  <div class="animal ${type}">
    <img src="./images/animals/${type}.png" alt=${type} class="animal_img">
    <div class="animal_detail">
      <div class="animal_species">
        ${species}
      </div>
      <div class="animal_name_container">
        <span class="animal_name_title">
          Name:
        </span>
        ${name}
      </div>
      <div class="animal_character_container">
        <div class="animal_character">
          <span class="animal_character_title">Swimmable:</span>
          ${swimmable}
        </div>
      </div>
      <div for="animal_foodLevel_container">
        <span class="animal_foodLevel_title">
          FoodLevel
        </span>
        <div class="animal_foodLevel">
          <div class="gauge" style="width: ${foodLevel}%; background-color: ${color}">
          </div>
        </div>
      </div>
    </div>
    <div class="animal_controller">
      <button class="animal_feed">feed</button>
      <button class="animal_remove">remove</button>
    </div>
  </div>
  `;
  animalContainer.appendChild(child);
  const gauges = animalContainer.getElementsByClassName("gauge");
  const newAnimalGauge = gauges[gauges.length - 1];
  const interval = setInterval(() => {
    if (animal.foodLevel <= 0) clearInterval(interval)
    newAnimalGauge.style.width = `${animal.foodLevel}%`;
    if (newAnimalGauge.style.backgroundColor !== animal.color)     newAnimalGauge.style.backgroundColor = animal.color;
    console.log("COLOR", newAnimalGauge.style.backgroundColor);
  }, 1000);
  const feedBtns = animalContainer.getElementsByClassName("animal_feed");
  feedBtns[feedBtns.length - 1].addEventListener("click", () => animal.feed())

}

/** Create Animal Component */
function generateAnimal(e) {
  e.preventDefault();
  const name = animalName.value;
  const type = addSelector.value;
  const foodType = determineFoodType(type);
  if (foodType) {
    let newAnimal = generateClass(name, type, foodType);

    // newAnimal.decreaseFoodLevel()
    /** APPEND CHILD */
    createElement(newAnimal);
  }

}

/**************** Remove Animal Component *******************/

/** EVENTLISTENERS */
Object.values(controllerButtons).forEach(button => button.addEventListener("click", toggleForm));

generateButton.addEventListener("click", generateAnimal);

addSelector.addEventListener("change", (e) => { console.log(e.target.value); });
