// 1. Unique property keys with Symbols
const idSabin = Symbol('id');
const nameSabin = Symbol('name');

const userSabin = {
  [idSabin]: 12345,
  [nameSabin]: 'Sabin',
  email: 'sabin@example.com'
};

console.log(userSabin[idSabin]); // 12345
console.log(userSabin[nameSabin]); // Sabin
console.log(Object.keys(userSabin)); // ['email'] — Symbols hidden!

// 2. Global Symbols
const globalIdSabin = Symbol.for('globalId');
const sameIdSabin = Symbol.for('globalId');
console.log(globalIdSabin === sameIdSabin); // true
console.log(Symbol.keyFor(globalIdSabin)); // "globalId"

// 3. Well-known Symbols: Custom Iterator
const sabinIterable = {
  data: ['JS', 'Node', 'Hacktoberfest'],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        }
        return { done: true };
      }
    };
  }
};

for (const item of sabinIterable) {
  console.log('Iterating:', item);
}

// 4. Symbol.toStringTag
const sabinBox = {
  content: 'JS Knowledge',
  [Symbol.toStringTag]: 'SabinBox'
};
console.log(Object.prototype.toString.call(sabinBox)); // [object SabinBox]

// 5. Symbol.hasInstance
class SabinArray {
  constructor(...items) {
    this.items = items;
  }
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance.items);
  }
}

const myArrSabin = new SabinArray(1, 2, 3);
console.log(myArrSabin instanceof SabinArray); // true
console.log([] instanceof SabinArray); // false

// 6. Symbol.species for inheritance control
class SabinCollection extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}

const collSabin = new SabinCollection(1, 2, 3);
const slicedSabin = collSabin.slice(1);
console.log(slicedSabin instanceof Array); // true
console.log(slicedSabin instanceof SabinCollection); // false