function add(a, b) {
    return a + b
}

let sum = add(2, 3)
console.log(sum)

// Anonymus Functions have no name and the returned value is directly assigned to a variable. ALso called as function expression
let anymsSum = function (c, d) {
    return c + d
}
console.log(anymsSum(3, 3))

// Above can be more simplified using the fat pipe "=>" operator which represents anonymous function
let anonymousFatPipe = (e, f) => e + f
console.log(anonymousFatPipe(4, 4))