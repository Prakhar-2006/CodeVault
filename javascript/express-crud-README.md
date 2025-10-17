# Express.js CRUD Boilerplate

A simple REST API demonstrating CRUD operations with Express.js using in-memory data.

## Setup

```bash
npm install express
node express-crud-boilerplate.js
```

## API Endpoints

- `GET /users` - Fetch all users
- `GET /users/:id` - Fetch user by ID
- `POST /users` - Create a user (requires `name` and `email` in body)
- `PUT /users/:id` - Replace a user (requires `name` and `email` in body)
- `PATCH /users/:id` - Partially update a user
- `DELETE /users/:id` - Remove a user

## Testing

Use curl, Postman, or browser:

```bash
# Get all users
curl http://localhost:3000/users

# Create a user
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name":"Charlie","email":"charlie@example.com"}'

# Update a user
curl -X PATCH http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"name":"Alice Updated"}'

# Delete a user
curl -X DELETE http://localhost:3000/users/2
```
