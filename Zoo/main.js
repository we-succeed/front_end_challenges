/** IMPORT OBJECTS */
// import { Zoo, Animal } from "./classes";
// const {Zoo, Animal} = requires("./classes")

/** GET ELEMENTS */

/** Get main element */
const main = document.querySelector("main");
// console.log(main)
// const cat = document.querySelector(".animal")
// console.log(cat)

const controllerButtons = {
  add : document.querySelector(".controller_add_btn"),
  revmoe: document.querySelector(".controller_remove_btn")
}

/** FUNCTIONS */
function startGame() {
  main.className = "main";
}

function updateAnimal(e) {
  console.log(e)
}

/** EVENTLISTENERS */
// cat.addEventListener("click", (e) => console.log(e))
Object.values(controllerButtons).forEach(button => button.addEventListener("click", updateAnimal))