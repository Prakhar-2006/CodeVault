// 1. Basic Proxy for validation
const createValidatedObjectSabin = (obj) => {
  return new Proxy(obj, {
    set(target, prop, value) {
      if (prop === 'age' && (!Number.isInteger(value) || value < 0)) {
        throw new Error('Age must be a positive integer');
      }
      if (prop === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        throw new Error('Invalid email format');
      }
      target[prop] = value;
      return true;
    },
    get(target, prop) {
      return prop in target ? target[prop] : `Property "${prop}" not found`;
    }
  });
};

const personSabin = createValidatedObjectSabin({ name: 'Sabin' });
personSabin.age = 25;
personSabin.email = 'sabin@example.com';
console.log(personSabin.age); // 25
console.log(personSabin.email); // sabin@example.com
console.log(personSabin.unknown); // Property "unknown" not found
// personSabin.age = -5; // Throws error

// 2. Proxy with logging
const withLoggingSabin = (obj) => {
  return new Proxy(obj, {
    get(target, prop) {
      console.log(`GET: ${prop}`);
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      console.log(`SET: ${prop} = ${value}`);
      return Reflect.set(target, prop, value);
    }
  });
};

const configSabin = withLoggingSabin({ theme: 'dark', lang: 'en' });
configSabin.theme = 'light'; // Logs SET
console.log(configSabin.lang); // Logs GET

// 3. Auto-save proxy using Reflect
const autoSaveSabin = (obj, saveFn) => {
  return new Proxy(obj, {
    set(target, prop, value) {
      const result = Reflect.set(target, prop, value);
      saveFn(target);
      return result;
    }
  });
};

const settingsSabin = autoSaveSabin(
  { volume: 50, brightness: 80 },
  (data) => console.log('Auto-saved:', data)
);
settingsSabin.volume = 75; // Auto-saved: { volume: 75, brightness: 80 }

// 4. Revocable Proxy
const { proxy: revocableSabin, revoke } = Proxy.revocable(
  { secret: 'Hacktoberfest2025' },
  {
    get(target, prop) {
      if (prop === 'secret') return '[REDACTED]';
      return target[prop];
    }
  }
);

console.log(revocableSabin.secret); // [REDACTED]
revoke();
try {
  console.log(revocableSabin.secret);
} catch (e) {
  console.log('Revoked:', e.message); // TypeError
}