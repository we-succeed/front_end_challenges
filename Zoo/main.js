class Zoo {
  constructor() {
    this.animals = {};
  }
  add(type, name) {
    // const type = animal.type
    if (!this.animals[type]) this.animals[type] = {};
    this.animals[type][name] = true;
  }
  remove(type, name) {
    delete this.animals[type][name];
  }
  checkNumber(type) {
    if (this.animals[type]) {
      let count = Object.keys(this.animals[type]).length;
      if (count >= 10) return false;
    }
    return true;
  }
  unique(type, name) {
    const hasCapacity = this.checkNumber(type);
    if (hasCapacity) {
      if (this.animals?.[type]?.[name]) {
        return false;
      }
      return true;
    }
    return false;
  }
}

class Animal {
  #dead;
  constructor(name, type, foodType, swim, species) {
    this.name = name;
    this.type = type;
    this.foodType = foodType;
    this.swimmable = swim;
    this.species = species;
    this.foodLevel = Math.floor(Math.random() * 30) + 30;
    this.color = "blue";
    this.#dead = false;
    this.init();
  }
  get name() {
    return this._name;
  }
  set name(newName) {
    newName = newName.trim();
    if (newName === '') {
      throw 'The name cannot be empty';
    }
    this._name = newName;
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
      this.foodLevel -= 2;
      if (this.foodLevel <= 0) {
        this.dead();
        this.foodLevel = 0;
        clearInterval(interval);
      }
      if (this.foodLevel >= 50) this.color = "blue";
      if (this.foodLevel < 50) this.color = "orange";
      if (this.foodLevel < 25) this.color = "red";
    }, 500);
  }

  feed() {
    if (this.foodLevel < 50) this.foodLevel += 30;
  }

  dead() {
    this.#dead = true;
    console.log(`${this.name} is dead`);
  }

}
class Mammal extends Animal { }

class Bird extends Animal { }

class Raptile extends Animal { }

const zoo = new Zoo();
/**************** GENERATE OPTIONS *******************/

const select = document.querySelector("select");
const animalList = ["Cat", "Duck", "Dino", "Fox", "Lion", "Penguin", "Sheep"];
animalList.map(animal => {
  const option = document.createElement("option");
  option.setAttribute("value", animal);
  option.textContent = animal;
  select.appendChild(option);
});

/**************** GET ELEMENTS *******************/

/** Get main element */
const main = document.querySelector("main");

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

function determineFoodType(type) {
  let foodType;

  if (foodTypes.Omnivore.includes(type)) foodType = "Omnivore";
  if (foodTypes.Herbivore.includes(type)) foodType = "Herbivore";
  if (foodTypes.Carnivore.includes(type)) foodType = "Carnivore";
  return foodType;
}

/** GENERATE CLASS */
function generateClass(name, type, foodType) {
  /** CHECK UNIQUE */
  const unique = zoo.unique(type, name);
  if (!unique) return false;
  /** Type Groups */
  const canSwim = swimmable.includes(type) ? "Yes" : "No";

  let newAnimal;
  if (types.Mammal.includes(type)) newAnimal = new Mammal(name, type, foodType, canSwim, "Mammal");
  if (types.Bird.includes(type)) newAnimal = new Bird(name, type, foodType, canSwim, "Bird");
  if (types.Raptile.includes(type)) newAnimal = new Raptile(name, type, foodType, canSwim, "Raptile");

  zoo.add(type, name);
  return newAnimal;
}

/** Create Animal Component */
function generateAnimal(e) {
  e.preventDefault();
  const name = animalName.value.replace(/\s/g, "");
  const type = addSelector.value;
  const foodType = determineFoodType(type);
  if (foodType) {
    let newAnimal = generateClass(name, type, foodType);
    if (!newAnimal) return;
    /** APPEND CHILD */
    createElement(newAnimal);
  }
  // reset input
  animalName.value = "";
}

/** Remove Animal Component */
function removeAnimal(e, type, name, parent, animal) {
  zoo.remove(type, name);
  parent.removeChild(animal);
}

/** CREATE HTML ELEMENTS */
function createElement(animal) {
  // distructuring
  const { name, type, swimmable, foodType, foodLevel, species, color } = animal;
  /** CHILD */
  const child = document.createElement("div");
  child.setAttribute("class", `animal ${type} ${type}${name}`);
  child.innerHTML = `
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
  `;
  animalContainer.prepend(child);
  const gauges = animalContainer.getElementsByClassName("gauge");
  const childElement = animalContainer.querySelector(`.${type}${name}`);
  const animalElement = child.querySelector(".animal_remove");

  const feedBtns = child.querySelector(".animal_feed");
  const newAnimalGauge = gauges[0];
  const interval = setInterval(() => {
    newAnimalGauge.style.width = `${animal.foodLevel}%`;
    if (newAnimalGauge.style.backgroundColor !== animal.color) newAnimalGauge.style.backgroundColor = animal.color;
    if (animal.foodLevel === 0) {
      child.classList.add("dead");
      clearInterval(interval);
    };
  }, 1000);

  feedBtns.addEventListener("click", () => animal.feed());

  animalElement.addEventListener("click", (e) => removeAnimal(e, type, name, animalContainer, childElement));
}


/**************** Remove Animal Component *******************/

/** EVENTLISTENERS */

generateButton.addEventListener("click", generateAnimal);
