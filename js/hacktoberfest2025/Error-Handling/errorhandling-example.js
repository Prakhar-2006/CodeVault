const validateInputSabin = (value) => {
  if (typeof value !== 'number') {
    throw new Error('Input must be a number');
  }
  return value * 2;
};

const simulateAsyncTaskSabin = () => {
  return new Promise((resolve, reject) => {
    const randomSuccess = Math.random() > 0.4;
    setTimeout(() => {
      if (randomSuccess) resolve('Task completed successfully');
      else reject(new Error('Task failed due to random error'));
    }, 1000);
  });
};

const processWithTryCatchSabin = async () => {
  try {
    console.log('Starting process...');
    const result = await simulateAsyncTaskSabin();
    console.log(result);
    const doubled = validateInputSabin('not a number'); // This will throw
    console.log(`Doubled value: ${doubled}`);
  } catch (error) {
    console.error(`Caught error: ${error.message}`);
  }
};

const customErrorSabin = class extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomSabinError';
  }
};

const throwCustomErrorSabin = (condition) => {
  try {
    if (!condition) throw new customErrorSabin('Condition not met');
    console.log('Condition passed');
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
};

const handleMultipleErrorsSabin = () => {
  const operations = [
    () => validateInputSabin(5),
    () => validateInputSabin('string'),
    () => simulateAsyncTaskSabin()
  ];

  operations.forEach(operation => {
    try {
      const result = operation();
      if (result instanceof Promise) {
        result.then(data => console.log(`Success: ${data}`))
              .catch(err => console.error(`Async error: ${err.message}`));
      } else {
        console.log(`Result: ${result}`);
      }
    } catch (error) {
      console.error(`Sync error: ${error.message}`);
    }
  });
};

// Run the examples
processWithTryCatchSabin();
throwCustomErrorSabin(false);
handleMultipleErrorsSabin();