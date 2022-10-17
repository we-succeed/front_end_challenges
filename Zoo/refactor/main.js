/** To import module, <script type="module"...> */
import { Zoo, Mammal, Bird, Raptile } from "./Classes.js";
const zoo = new Zoo();

/** ELEMENTS */
// ADD SECTION
const selectType = document.querySelector("#select");
const addButton = document.querySelector(".add_animal_button");
const nameInput = document.querySelector(".add_animal_name");
const clearButton = document.querySelector(".clear_animal_button");
// ANIMAL CONTAINER
const animalsContainer = document.querySelector(".animals_container");
/** GENERATE OPTIONS */
const animalList = Object.keys(zoo.list);
animalList.map(animal => {
  const option = document.createElement("option");
  option.setAttribute("value", animal);
  option.textContent = animal;
  select.appendChild(option);
});

/***** METHODS ******/

const removeAnimal = (animal, animalElement) => {
  zoo.remove = animal;
  animalsContainer.removeChild(animalElement);
};

/** Draw a new Animal HTML elements */
const drawAnimal = (animal) => {
  // get parent
  const { name, type, foodLevel, color } = animal;
  const { species, foodType, swimmable } = zoo.getDetails(animal);
  const child = document.createElement("div");
  child.setAttribute("class", `animal ${type} ${type}${name}`);
  child.innerHTML = `
    <div class="animal_detail">
      <div class="animal_species">
        ${species}
      </div>
      <div class="animal_name_container">
        <label class="animal_name_title">
          Name:
        </label>
        ${name}
      </div>
      <div class="animal_character_container">
        <label class="animal_character_title">Swimmable:</label>
        ${swimmable}
      </div>
      <div class="animal_foodType_container">
        <label class="animal_foodType_title">FoodType:</label>
        ${foodType}
      </div>
      <div class="animal_foodLevel_container">
        <label class="animal_foodLevel_title">
          FoodLevel
        </label>
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
  animalsContainer.prepend(child);
  const gauges = animalsContainer.getElementsByClassName("gauge");
  const childElement = animalsContainer.querySelector(`.${type}${name}`);
  const animalElement = child.querySelector(".animal_remove");

  const feedBtns = child.querySelector(".animal_feed");
  const newAnimalGauge = gauges[0];
  const interval = setInterval(() => {
    newAnimalGauge.style.width = `${animal.foodLevel}%`;
    if (newAnimalGauge.style.backgroundColor !== animal.color) newAnimalGauge.style.backgroundColor = animal.color;
    if (animal.foodLevel === 0) {
      child.classList.add("dead");
      zoo.dead = animal;
      clearInterval(interval);
    };
  }, 200);

  feedBtns.addEventListener("click", () => {
    console.log("CLICKED")
    zoo.feed(animal)
  });
  animalElement.addEventListener("click", () => {
    removeAnimal(animal, childElement)
    clearInterval(interval);
  });
};

/** Generate Animal Class and Add in Zoo */
const generateAnimal = () => {
  const animalType = selectType.value;
  const animalName = nameInput.value.replace(/\s/g, "");
  if (animalName) {
    const isExist = zoo.isExist({ type: animalType, name: animalName }); // true if exist, false if not exist
    const species = zoo.returnSpecies({ type: animalType, name: animalName });
    if (!isExist) {
      let animal;
      if (species === "Mammal") animal = new Mammal(animalType, animalName);
      if (species === "Raptile") animal = new Raptile(animalType, animalName);
      if (species === "Bird") animal = new Bird(animalType, animalName);
      zoo.add = animal;
      drawAnimal(animal);
    }
    // clear input
    nameInput.value = "";
  }
};

/** Clear all dead animals */
const clearAnimals = () => {
  zoo.doClear();
  const deadAnimalElements = document.getElementsByClassName("dead");
  const length = deadAnimalElements.length;
  let i = 0;
  while (i < length) {
    animalsContainer.removeChild(deadAnimalElements[0]);
    i++;
  }
};

/** EVENTLISTENERS */
addButton.addEventListener("click", generateAnimal);
clearButton.addEventListener("click", clearAnimals);