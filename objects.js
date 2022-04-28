// Objects are the collection of properties

let person = {
    firstName: 'Tim',
    lastName: 'Singh',
    age: 31,
    fullName: function () {
        console.log(this.firstName + ' ' + this.lastName)
    }
}
console.log(person)
console.log(person.firstName)
console.log(person.lastName)
console.log(person.fullName())

//ANother way is
console.log(person['firstName'])
console.log(person['lastName'])

// Change property value at run time
person.firstName = 'Tim 2'
person.lastName = 'Singh 2'
console.log(person.firstName)
console.log(person.lastName)

// Add a new property
console.log(person)
person.gender = 'Male' // add new property at run time
console.log(person)
console.log('Gender property exists?' + 'gender' in person)

//Delete property at run time
delete person.gender
console.log(person)

//Check if a property is present in an onject
console.log('Gender property exists?' + 'gender' in person)

//print all the values in an object
for (let key in person) {
    console.log(person[key])
}