// Arrow Function
const addSabin = (a, b) => a + b;

// Traditional Function Expression
const multiplySabin = function(a, b) {
  return a * b;
};

// Function Declaration with Default Parameters
function sabinHello(name = 'Sabin') {
  return `Hello, ${name}!`;
}

// Rest Parameters
function sumSabin(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

// Closure and Higher-Order Function
const createMultiplierSabin = multiplier => {
  return number => number * multiplier;
};
const tripleSabin = createMultiplierSabin(3);

// Immediately Invoked Function Expression (IIFE)
const counterSabin = (() => {
  let count = 0;
  return {
    incrementSabin: () => ++count,
    getCountSabin: () => count
  };
})();

// Higher-Order Function
const higherOrderSabin = func => arg => func(arg);
const cubeSabin = higherOrderSabin(x => x ** 3);

// Generator Function
function* rangeGeneratorSabin(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

// Async/Await Function
async function fetchDataSabin() {
  const promise = new Promise(resolve => 
    setTimeout(() => resolve('Data fetched successfully'), 1000)
  );
  try {
    const result = await promise;
    return result;
  } catch (error) {
    return `Error: ${error}`;
  }
}

// Object Method with 'this'
const calculatorSabin = {
  value: 100,
  addToValueSabin(amount) {
    this.value += amount;
    return this.value;
  },
  getValueSabin() {
    return this.value;
  }
};

// Function Binding
const boundAddToValueSabin = calculatorSabin.addToValueSabin.bind(calculatorSabin);

// Call and Apply Methods
function combineSabin(a, b, c) {
  return this.value + a + b + c;
}
const appliedResultSabin = combineSabin.apply(calculatorSabin, [10, 20, 30]);
const calledResultSabin = combineSabin.call(calculatorSabin, 5, 15, 25);

// Recursive Function
function fibonacciSabin(n) {
  if (n <= 1) return n;
  return fibonacciSabin(n - 1) + fibonacciSabin(n - 2);
}

// Function Composition
const composeSabin = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const addFiveSabin = x => x + 5;
const squareSabin = x => x ** 2;
const composedFunctionSabin = composeSabin(addFiveSabin, squareSabin);

// Pure Function
const calculateAreaSabin = (length, width) => length * width;

// Memoization
const memoizeSabin = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};
const memoizedFibonacciSabin = memoizeSabin(fibonacciSabin);

// Currying
const currySabin = fn => (...args) => {
  if (args.length >= fn.length) return fn(...args);
  return (...moreArgs) => currySabin(fn)(...args, ...moreArgs);
};
const addThreeNumbersSabin = currySabin((a, b, c) => a + b + c);

// Destructuring in Function Parameters
const processUserSabin = ({ name, age }) => `${name} is ${age} years old`;

// Function with Promises
const delaySabin = ms => new Promise(resolve => setTimeout(resolve, ms));
async function sequentialTasksSabin() {
  await delaySabin(1000);
  console.log('Task 1 completed');
  await delaySabin(1000);
  console.log('Task 2 completed');
  return 'All tasks done';
}

// Event Emitter Pattern
class EventEmitterSabin {
  constructor() {
    this.events = new Map();
  }
  onSabin(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
  }
  emitSabin(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(callback => callback(...args));
    }
  }
}
const emitterSabin = new EventEmitterSabin();

// Example Usage
console.log(addSabin(10, 5)); // Arrow Function
console.log(multiplySabin(4, 3)); // Function Expression
console.log(sabinHello()); // Default Parameters
console.log(sabinHello('Sabina')); // Default Parameters
console.log(sumSabin(1, 2, 3, 4, 5)); // Rest Parameters
console.log(tripleSabin(7)); // Closure
console.log(counterSabin.incrementSabin()); // IIFE
console.log(counterSabin.getCountSabin()); // IIFE
console.log(cubeSabin(4)); // Higher-Order Function
const rangeSabin = rangeGeneratorSabin(1, 5); // Generator Function
for (let num of rangeSabin) {
  console.log(num);
}
fetchDataSabin().then(result => console.log(result)); // Async/Await
console.log(calculatorSabin.addToValueSabin(50)); // Object Method
console.log(boundAddToValueSabin(25)); // Function Binding
console.log(appliedResultSabin); // Apply Method
console.log(calledResultSabin); // Call Method
console.log(fibonacciSabin(6)); // Recursive Function
console.log(composedFunctionSabin(3)); // Function Composition
console.log(calculateAreaSabin(5, 4)); // Pure Function
console.log(memoizedFibonacciSabin(6)); // Memoization
const curriedAddSabin = addThreeNumbersSabin(2)(3); // Currying
console.log(curriedAddSabin(5));
console.log(processUserSabin({ name: 'Sabin', age: 25 })); // Destructuring
sequentialTasksSabin().then(result => console.log(result)); // Promises
emitterSabin.onSabin('sabinHello', name => console.log(`Emitted: Hello ${name}`)); // Event Emitter
emitterSabin.emitSabin('sabinHello', 'Sabin');