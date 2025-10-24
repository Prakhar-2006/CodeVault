// Sabin's OOP Mastery

// 1. Base Class
class Person {
  #id; // Private field
  static count = 0;

  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.#id = ++Person.count;
  }

  // Instance method
  greet() {
    return `Namaste! I'm ${this.name}, ${this.age} years old.`;
  }

  // Getter
  get id() {
    return this.#id;
  }

  // Static method
  static getTotal() {
    return `Total persons: ${Person.count}`;
  }
}

// 2. Inheritance
class Developer extends Person {
  #skills = [];

  constructor(name, age, language) {
    super(name, age);
    this.language = language;
  }

  addSkill(skill) {
    this.#skills.push(skill);
    return this;
  }

  code() {
    return `${this.name} is coding in ${this.language}! Skills: ${this.#skills.join(', ')}`;
  }

  // Override
  greet() {
    return `${super.greet()} I code in ${this.language}.`;
  }
}

// 3. Factory Pattern
const createSabin = (name) => new Developer(name, 25, 'JavaScript');

// 4. Composition over Inheritance
const canCode = {
  code() {
    return `${this.name} writes clean code!`;
  }
};

const canTeach = {
  teach() {
    return `${this.name} teaches JS to kids!`;
  }
};

const sabinMentor = Object.assign(createSabin('Sabin'), canCode, canTeach);

// Run OOP Demo
const sabin = createSabin('Sabin Khatri');
sabin.addSkill('JavaScript').addSkill('React');

console.log(sabin.greet());
console.log(sabin.code());
console.log(sabinMentor.teach());
console.log(Person.getTotal());