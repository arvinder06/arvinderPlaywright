const Person = require('./classes')

class Pet extends Person {

    //have to add same constructor as in parent class
    constructor(firstName, lastName) {
        super(firstName, lastName) // have to call the constructor of parent class
    }

    get location() { //overriding the property in sub class
        return 'Canada'
    }
}

let pet = new Pet("Pet", "Tommy")
console.log(pet.fullName())
console.log(pet.location)
console.log(pet.age)