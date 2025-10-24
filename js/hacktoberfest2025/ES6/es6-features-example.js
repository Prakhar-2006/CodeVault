// ES6+ Features with Sabin Naming
const sabin = { name: 'Sabin', age: 25, city: 'Kathmandu' };

// 1. Destructuring
const { name: sabinName, age, ...rest } = sabin;
console.log(sabinName, age); // Sabin 25
console.log(rest); // { city: 'Kathmandu' }

// 2. Spread & Rest
const skills = ['JS', 'Node'];
const sabinWithSkills = { ...sabin, skills: [...skills, 'React'] };
console.log(sabinWithSkills);

// 3. Template Literals
const greeting = `Hello, I'm ${sabinName} from ${sabin.city}!`;
console.log(greeting);

// 4. Arrow Functions + Lexical this
class SabinTimer {
  constructor() {
    this.count = 0;
    setInterval(() => {
      this.count++;
      console.log(`Timer: ${this.count}`);
    }, 1000);
  }
}
const timer = new SabinTimer();

// 5. Default Parameters + Optional Chaining
const greetSabin = (person = sabin, suffix = '!') => {
  return `Hi ${person?.name ?? 'Guest'}${suffix}`;
};
console.log(greetSabin()); // Hi Sabin!
console.log(greetSabin(null)); // Hi Guest!

// 6. Classes & Inheritance
class Person {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} says hi`; }
}
class Coder extends Person {
  code() { return `${this.name} writes JS`; }
}
const coderSabin = new Coder('Sabin');
console.log(coderSabin.speak(), coderSabin.code());

// 7. Modules (simulated)
export { sabinWithSkills };
import { sabinWithSkills as imported } from './es6-features-example.js'; // Node/ESM
console.log('Imported:', imported);