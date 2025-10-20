const validateEmailSabin = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email) ? 'Valid email' : 'Invalid email';
};

const validatePasswordSabin = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(password) ? 'Valid password' : 'Password must be at least 8 characters with letters and numbers';
};

const extractNumbersSabin = (text) => {
  const regex = /\d+/g;
  return text.match(regex) || [];
};

const extractWordsSabin = (text) => {
  const regex = /\b\w+\b/g;
  return text.match(regex) || [];
};

const replaceTextSabin = (text) => {
  const regex = /\b(Sabin)\b/gi;
  return text.replace(regex, 'SabinTheGreat');
};

const replaceGlobalSabin = (text) => {
  const regex = /[aeiou]/gi;
  return text.replace(regex, '*');
};

const splitByPatternSabin = (text) => {
  const regex = /\s+/;
  return text.split(regex);
};

const findDatesSabin = (text) => {
  const regex = /\b(\d{1,2})[/-](\d{1,2})[/-](\d{4})\b/g;
  const matches = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push(`${match[1]}/${match[2]}/${match[3]}`);
  }
  return matches;
};

const testPhoneNumberSabin = (phone) => {
  const regex = /^\+?1?\d{10,12}$/;
  return regex.test(phone) ? 'Valid phone number' : 'Invalid phone number';
};

console.log(validateEmailSabin('sabin@example.com')); // Valid email
console.log(validateEmailSabin('sabin@.com')); // Invalid email
console.log(validatePasswordSabin('Password123')); // Valid password
console.log(validatePasswordSabin('pass')); // Password must be at least 8 characters...
console.log(extractNumbersSabin('I have 25 apples and 10 oranges')); // ['25', '10']
console.log(extractWordsSabin('Hello, Sabin! How are you?')); // ['Hello', 'Sabin', 'How', 'are', 'you']
console.log(replaceTextSabin('Hello Sabin, meet Sabin again')); // Hello SabinTheGreat, meet SabinTheGreat again
console.log(replaceGlobalSabin('Hello Sabin')); // H*ll* S*b*n
console.log(splitByPatternSabin('Sabin is learning JavaScript today')); // ['Sabin', 'is', 'learning', 'JavaScript', 'today']
console.log(findDatesSabin('Born 15-10-2000, event 20/10/2025')); // ['15/10/2000', '20/10/2025']
console.log(testPhoneNumberSabin('+977123456789')); // Valid phone number
console.log(testPhoneNumberSabin('123')); // Invalid phone number