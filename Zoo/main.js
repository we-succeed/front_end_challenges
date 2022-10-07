class Animal {
  species = {};  // type: number(ID)
  constructor(name, type) {
    // super(type);
    this._id = Animal.counter;
    this.name = name;
    this.type = type;
    this.foodLevel = Math.floor(Math.random() * 100);
    console.log(`${this.name} with ${this.id} generated. FoodLevel is ${this.foodLevel}`);
  }
  get id() {
    return this._id;
  }
  set id(num) {
    this._id = num;
  }
  static get counter() {
    Animal._counter = (Animal._counter || 0) + 1;
    return Animal._counter;
  }
  assignID(type) {
    if (!this.species[type]) this.species[type] = 0;
    if (this.species[type] === 10) return;
    this.species[type]++;
    return this.species[type];
  }
};
class Cat extends Animal {
  constructor(name, type) {
    super(name, type)
    // this._id = super.counter;
    // console.log(this.id)
  }

  // get id() {
  //   return this._id;
  // }
  // set id(num) {
  //   this._id = num;
  // }
  // static get counter() {
  //   Cat._counter = (Cat._counter || 0) + 1;
  //   return Cat._counter;
  // }

}
class Dino extends Animal {}
/** Create Zoo */
// const animalLists = ["Cat", "Chicken", "Dino", "Duck", "Fox", "Lion", "Penguin", "Rabbit", "sheep"];
// const zoo = new Zoo;

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
  // TOGGLES
  // if (value === "add") {
    // toggleAddForm = !toggleAddForm;
  // }
  // if (value === "remove") {
    // toggleRemoveForm = !toggleRemoveForm;
  // }

  // SHOW FORMS
  // if (toggleAddForm || toggleRemoveForm) {
    toggleElements[value].classList.add("show");
  // }
}

/** Create Animal Component */
function generateAnimal(e) {
  e.preventDefault();
  // get information of form
  const name = animalName.value;
  const type = addSelector.value;
  // console.log(toggleElements.add.target.value);
  // const cat = new Animal(name, type);
  const a = new Cat(name, type);
  const b = new Dino(name, type);
  console.log(a, b)
}

/** Remove Animal Component */

/** EVENTLISTENERS */
Object.values(controllerButtons).forEach(button => button.addEventListener("click", toggleForm));

generateButton.addEventListener("click", generateAnimal);

addSelector.addEventListener("change", (e) => { console.log(e.target.value); });