export class Zoo {
  // constructor is a default value of this class
  constructor(types) {
    this.types = types
    console.log("THIS IS ZOO")
  }
};

export class Animal extends Zoo {
  constructor(type, number) {
    this.type = type;
    this.number = number;
  }

  remove(type, number) {
    console.log(`REMOVE ${number} in ${type}`)
  }
};

// export {Zoo, Animal}