# Project_Zoo Tycoon

This is mini project practicing OOP concept of JavaScript.<br />
## Plan
* ~~Scrub image resources if animals~~
* Design app workflows
* Understanding OOP in JS
* Start coding

## Resources
Imgage : https://www.pngegg.com/ko/png-bfcwi
Image cutting tool : Photoshop

## Design
* Each category's max capacity is 10
* Each animal has name, foodLevel, own character(active, lazy, immature, sensitive, eccentric, moody)
* User can feed animals if animal's foodLevel is below...

1. home page = zoo background. enter `start` to start
2. main page = control section on header or aside, main zoo on main
3. import or create animal with `add` button
  3-1. click `add` will show detail card (name, category)
  3-2. click `confirm` will create the animal with random foodLevel and character
  3-3. `cannot add` if the capacity is 10 and disabled the category
4. remove animal with `remove` button
  4-1. click `remove` will show all lists of animals
  4-2. click animal want to remove
  4-3. click `confirm` will remove the animal
5. feed animals if animal's foodLevel is below.. ?
  5-1. click feed on animal card OR `autoFeed` button on control section

## module import vs require
* Import => provided by ES6
1. syntax = import moment from "moment";
2. pros
  2-1. readability with `import, from, export, default`
  2-2. only import required parts which is good for memory
* require => provided by Node.js
1. syntax = const moment = require("moment");

## child Class extends(inherit) parent Class
* Must call super constructor in derived class before accessing 'this'
```js
  class Parent {
    constructur(types) {
      this.types = types
    }
  }

  class Child extends Parent {
    // INVALID
    constructor(type) {
      this.type = type
      super();
    }
    // VALID
    constructor(type) {
      super();
      this.type = type
    }
  }
```

## ES6 Class getter and setter
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get

### Animal types
* Mammal : Cat, Fox, Lion, Rabbit, Sheep
* Bird : Chicken, Penguin, Duck
* Reptile : Dino

### FoodType
* Herbivore
* Carnivore
* Omnivore
