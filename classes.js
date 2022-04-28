// Classes are introduced in ES6 JavaScript engine onwards

//module.exports will export thr class and then we can import to another file and use the properties.
module.exports = class Person {
    age = 31 //class property

    // this is a getter method. When a function have get in the start, it is actually a property of a class
    get location() {
        return 'Australia'
    } //similar to this will be location='Australia' and both can be accessable in same manner

    //constructor
    constructor(firstName, lastName) { //here the function variables are not accessible in class level
        this.firstName = firstName //assigning the function variable values to access at class level
        this.lastName = lastName
    }

    //Functions
    fullName() {
        console.log(this.firstName + this.lastName)
    }

}

// let person = new Person("Arvinder", "Singh")
// console.log(person.age)
// console.log(person.location)
// console.log(person.firstName)
// console.log(person.lastName)
// console.log(person.fullName())