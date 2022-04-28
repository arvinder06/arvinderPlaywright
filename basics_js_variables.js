console.log("Hello World")

// ######## JS Variables

// The variables are loosely coupled, i.e. no need to define the data type unlike the JAVA where we have to tell compiler the data type
// javascript versions are ES1, ES2 etc
// Until ES5, var is used, however, ES6 onwards have let and const variable definition

let a = 1
console.log(a)
console.log(typeof (a)) //To identofy the datatype of a particular variable

let b = 22.33
console.log(typeof (b))

let c = 'Arvinder Singh'
console.log(typeof (c))

let d = false
console.log(typeof (d))

let e = null
console.log(typeof (e))

let f
console.log(typeof (f))

let sumAB = a + b
console.log(typeof (sumAB))
console.log(sumAB)

// same variable name cannot be redeclare using 'let' however with 'var' it is possible and no error will come.

console.log(!d) // Reverse of the boolean - not operator

sumAB = false // Morover, reassigning to the same let variable is allow
console.log(typeof (sumAB))

// const variable - cannot reassign variable and value will remain constant in entire script
const constantVariable = 123
console.log(constantVariable)
constantVariable = 321 //Cannot be done
console.log(constantVariable)