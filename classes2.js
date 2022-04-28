const Person = require('./classes')

let person = new Person("Arvinder", "Singh")
console.log(person.age)
console.log(person.location)
console.log(person.firstName)
console.log(person.lastName)
console.log(person.fullName())