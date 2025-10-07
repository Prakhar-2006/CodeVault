// Bubble Sort Algorithm
// Given an array of integers, this program sorts them in ascending order
// Author: Claygro
// by repeatedly comparing adjacent elements and swapping them if they are in the wrong order.

let arr = [1, 10, 5, 4, 2, 3, 2];

for (let i = 0; i < arr.length - 1; i++) {
  // Outer loop runs n-1 times
  for (let j = 0; j < arr.length - 1 - i; j++) {
    // Inner loop compares adjacent elements
    if (arr[j] > arr[j + 1]) {
      // Swap elements if the left one is greater than the right one
      let temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
    }
  }
}

console.log(arr); // Output: [1,2,2,3,4,5,10]

// --- Time and Space Complexity ---
// Time Complexity: O(n^2)
//   → Two nested loops (each up to n) give quadratic time.
// Space Complexity: O(1)
//   → Only a constant amount of extra memory (the temp variable) is used.
