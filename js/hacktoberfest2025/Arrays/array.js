let fruits = ["Apple", "Banana", "Cherry"];
let moreFruits = ["Date", "Elderberry"];

console.log("Original fruits:", fruits);

fruits.push("Grape");
console.log("After push (Grape):", fruits);

let lastFruit = fruits.pop();
console.log("Popped fruit:", lastFruit);
console.log("Fruits after pop:", fruits);

fruits.unshift("Avocado");
console.log("After unshift (Avocado):", fruits);

let firstFruit = fruits.shift();
console.log("Shifted fruit:", firstFruit);
console.log("Fruits after shift:", fruits);

let index = fruits.indexOf("Banana");
console.log("Index of Banana:", index);

let slicedFruits = fruits.slice(1, 3);
console.log("Sliced fruits (from index 1 to 3):", slicedFruits);
console.log("Original fruits after slice:", fruits);

fruits.splice(1, 1, "Blueberry", "Fig");
console.log("After splice (remove 1 at index 1, add Blueberry, Fig):", fruits);

let allFruits = fruits.concat(moreFruits);
console.log("Concatenated fruits:", allFruits);

allFruits.forEach(function(fruit) {
  console.log("Fruit via forEach:", fruit);
});

let mappedFruits = allFruits.map(function(fruit) {
  return fruit.toUpperCase();
});
console.log("Mapped fruits (uppercase):", mappedFruits);

let filteredFruits = allFruits.filter(function(fruit) {
  return fruit.startsWith("B");
});
console.log("Filtered fruits (starting with 'B'):", filteredFruits);

let foundFruit = allFruits.find(function(fruit) {
  return fruit.length > 7;
});
console.log("Found fruit (length > 7):", foundFruit);

let hasFig = allFruits.includes("Fig");
console.log("Does allFruits include Fig?", hasFig);

let sortedFruits = [...allFruits].sort();
console.log("Sorted fruits:", sortedFruits);
console.log("Original allFruits after sort (unchanged):", allFruits);

let reversedFruits = [...allFruits].reverse();
console.log("Reversed fruits:", reversedFruits);
console.log("Original allFruits after reverse (unchanged):", allFruits);

let numbers = [10, 2, 8, 1, 5];
let sum = numbers.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);
console.log("Sum of numbers:", sum);