/** To import module, <script type="module"...> */
import { Zoo, Mammal, Fish, Raptile } from "./Classes.js";
const zoo = new Zoo();

/** TYPES AND CHARACTER */
/**************** TYPES *******************/
const animalList = ["Cat", "Duck", "Dino", "Fox", "Lion", "Penguin", "Sheep"];
// const species = {
//   Mammal: ["Cat", "Lion", "Fox", "Rabbit", "Sheep"],
//   Bird: ["Chicken", "Penguin", "Duck"],
//   Raptile: ["Dino"]
// };
// const foodTypes = {
//   Omnivore: ["Cat", "Duck"],
//   Herbivore: ["Chicken", "Rabbit", "Sheep"],
//   Carnivore: ["Dino", "Fox", "Lion", "Penguin"]
// };
// const swimmable = ["cat", "Lion", "Fox", "Penguin", "Duck"];

/** ELEMENTS */
// ADD SECTION
const selectType = document.querySelector("#select")
const addButton = document.querySelector(".add_animal_button");
const nameInput = document.querySelector(".add_animal_name");

// ANIMAL CONTAINER
const animalsContainer = document.querySelector(".animals_container");

/** GENERATE OPTIONS */
animalList.map(animal => {
  const option = document.createElement("option");
  option.setAttribute("value", animal);
  option.textContent = animal;
  select.appendChild(option);
})

/***** METHODS ******/

/** Draw a new Animal HTML elements */
const drawAnimal = (animal) => {
  // get parent
  const { name, type, foodLevel, color } = animal;
  const {species, foodType, swimmable} = zoo.getDetails(animal);
  const child = document.createElement("div");
  child.setAttribute("class", `animal ${type} ${type}${name}`);
  child.innerHTML = `
    <img src="../images/animals/${type}.png" alt=${type} class="animal_img">
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
      clearInterval(interval);
    };
  }, 1000);

  feedBtns.addEventListener("click", () => zoo.feed(animal));

  animalElement.addEventListener("click", (e) => removeAnimal(e, type, name, animalsContainer, childElement));
}

/** Generate Animal Class and Add in Zoo */
const generateAnimal = () => {
  const animalType = selectType.value;
  const animalName = nameInput.value;
  const isExist = zoo.isExist({type: animalType, name: animalName}); // true if exist, false if not exist
  if (!isExist) {
    const animal = new Mammal(animalType, animalName);
    zoo.add = animal;
    drawAnimal(animal);
  }




  // clear input
  nameInput.value = "";
}

/** EVENTLISTENERS */
addButton.addEventListener("click", generateAnimal)
