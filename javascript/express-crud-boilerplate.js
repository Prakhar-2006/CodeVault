// Author: Rishabh
// Simple Express.js CRUD Boilerplate with in-memory data

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// In-memory user data
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];
let nextId = 3;

// GET /users - Fetch all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET /users/:id - Fetch user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST /users - Create a user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id - Replace a user
app.put('/users/:id', (req, res) => {
  const { name, email } = req.body;
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  users[index] = { id: parseInt(req.params.id), name, email };
  res.json(users[index]);
});

// PATCH /users/:id - Partially update a user
app.patch('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;

  res.json(user);
});

// DELETE /users/:id - Remove a user
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });

  const deletedUser = users.splice(index, 1);
  res.json(deletedUser[0]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
