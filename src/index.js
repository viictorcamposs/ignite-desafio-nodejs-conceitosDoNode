const express = require('express');
const cors = require('cors');
const { v4: uuid } = require('uuid');

const app = express()
.use(cors())
.use(express.json());

const users = [];

const checksExistsUserAccount = (request, response, next) => {
  const { username } = request.headers;
  
  const user = users.find(user => user.username === username);

  if (!user) return response.status(404).json({
    error: "Error while we tried to find username."
  });

  request.user = user;

  return next();
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const userAlreadyExists = users.find(
    (user) => user.username === username
  );

  if (userAlreadyExists) return response.status(400).json({
    error: "Error while we tried to create user with this username."
  });

  users.push({
    id: uuid(),
    name,
    username,
    todos: [],
  });

  return response.status(201).send();
});

app.get('/users', (request, response) => {
  return response.json(users);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;