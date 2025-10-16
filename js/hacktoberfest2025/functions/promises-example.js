const delaySabin = (ms) => new Promise(resolve => setTimeout(() => resolve(`Waited ${ms}ms`), ms));

const fetchDataSabin = () => {
  return new Promise((resolve, reject) => {
    const success = Math.random() > 0.3;
    setTimeout(() => {
      if (success) resolve({ name: 'Sabin', trek: 'Annapurna' });
      else reject(new Error('Failed to fetch data'));
    }, 2000);
  });
};

const processDataSabin = async () => {
  try {
    console.log('Starting process...');
    const delayResult = await delaySabin(1000);
    console.log(delayResult);
    const data = await fetchDataSabin();
    console.log(`Data received: ${data.name} is trekking ${data.trek}`);
    const anotherDelay = await delaySabin(1500);
    console.log(anotherDelay);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const chainPromisesSabin = () => {
  delaySabin(500)
    .then(result => {
      console.log(result);
      return fetchDataSabin();
    })
    .then(data => {
      console.log(`Chained data: ${data.name} is trekking ${data.trek}`);
      return delaySabin(1000);
    })
    .catch(error => console.error(`Error: ${error.message}`));
};

// Run the examples
processDataSabin();
chainPromisesSabin();