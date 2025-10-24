// DOM Manipulation with Sabin Style
const createSabinApp = () => {
  const app = document.createElement('div');
  app.id = 'sabin-app';
  app.innerHTML = `
    <h1>Sabin's DOM Playground</h1>
    <input type="text" id="sabin-input" placeholder="Type something..." />
    <button id="sabin-btn">Add Item</button>
    <ul id="sabin-list"></ul>
    <p id="sabin-count">Items: 0</p>
  `;
  document.body.appendChild(app);

  const input = document.getElementById('sabin-input');
  const btn = document.getElementById('sabin-btn');
  const list = document.getElementById('sabin-list');
  const count = document.getElementById('sabin-count');

  let items = 0;

  btn.addEventListener('click', () => {
    if (input.value.trim()) {
      const li = document.createElement('li');
      li.textContent = input.value;
      li.style.color = items % 2 === 0 ? 'blue' : 'green';
      li.addEventListener('click', () => li.remove());
      list.appendChild(li);
      items++;
      count.textContent = `Items: ${items}`;
      input.value = '';
    }
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') btn.click();
  });
};

// Run only in browser
if (typeof document !== 'undefined') {
  createSabinApp();
} else {
  console.log('DOM not available – run in browser!');
}