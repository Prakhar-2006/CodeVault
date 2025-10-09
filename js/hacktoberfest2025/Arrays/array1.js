let numbers = [10, 5, 20, 2, 8];
let anotherSetOfNumbers = [3, 7];

console.log("Original numbers:", numbers);

let doubledNumbers = numbers.map(function(num) {
  return num * 2;
});
console.log("Doubled numbers:", doubledNumbers);

let numbersPlusFive = numbers.map(function(num) {
  return num + 5;
});
console.log("Numbers + 5:", numbersPlusFive);

let evenNumbers = numbers.filter(function(num) {
  return num % 2 === 0;
});
console.log("Even numbers:", evenNumbers);

let oddNumbers = numbers.filter(function(num) {
  return num % 2 !== 0;
});
console.log("Odd numbers:", oddNumbers);

let product = numbers.reduce(function(accumulator, currentValue) {
  return accumulator * currentValue;
}, 1);
console.log("Product of all numbers:", product);

let sumOfNumbers = numbers.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);
console.log("Sum of all numbers:", sumOfNumbers);

let average = sumOfNumbers / numbers.length;
console.log("Average of numbers:", average);

let dividedNumbers = numbers.map(function(num) {
  return num / 2;
});
console.log("Numbers divided by 2:", dividedNumbers);

let combinedNumbers = numbers.concat(anotherSetOfNumbers);
console.log("Combined numbers:", combinedNumbers);

let maxNumber = Math.max(...numbers);
console.log("Maximum number:", maxNumber);

let minNumber = Math.min(...numbers);
console.log("Minimum number:", minNumber);

let allGreaterThanZero = numbers.every(function(num) {
  return num > 0;
});
console.log("Are all numbers greater than 0?", allGreaterThanZero);

let someGreaterThanTen = numbers.some(function(num) {
  return num > 10;
});
console.log("Are some numbers greater than 10?", someGreaterThanTen);

numbers.forEach(function(num, index) {
  console.log(`Number at index ${index} is ${num}`);
});