let marks = Array(6) //declaration
marks = new Array(10, 43, 55, 666, 55, 44) //initialization

console.log(marks)
console.log("\n******************************\n")

// Another way to define Array
var marks2 = [12, 43, 5, 6, 5566, 56, 43, 43, 34, 3, 2, 31, 43, 4, 543252, 34] //index starts with 0
console.log(marks2[3])
console.log("\n******************************\n")

marks2[3] = 14  // re-assigned the value on the index of array
console.log(marks2[3])
console.log("\n******************************\n")

console.log(marks2.length)
console.log("\n******************************\n")

marks2.push(100)  // Add new element to the end of the array
console.log(marks2)
console.log(marks2.length)
console.log("\n******************************\n")

marks2.pop() // delete last element of the array
console.log(marks2)
console.log(marks2.length)
console.log("\n******************************\n")

marks2.unshift(101010) //add element at the begining of the array
console.log(marks2)
console.log(marks2.length)
console.log("\n******************************\n")

console.log(marks2.indexOf(12))  // Find the index of a particular value in array
// if the element is not present, the node return -1. This can be used to check the presence of an element in an Array
// Moreover we can use the method below

console.log(marks2.includes(12)) //true
console.log(marks2.includes(102)) //false

