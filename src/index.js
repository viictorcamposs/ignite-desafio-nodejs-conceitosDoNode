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
  const { user } = request;

  return response.status(200).json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { title, deadline } = request.body;

  user.todos.push({
    id: uuid(),
    done: false,
    title,
    deadline: new Date(deadline),
    created_at: new Date(),
  });

  return response.status(201).send();
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;
  const { title, deadline } = request.body;

  const task = user.todos.find(
    (todo) => todo.id === id
  );

  if (!task) return response.status(404).json({
    error: "Task not found!"
  });

  task.title = title;
  task.deadline = new Date(deadline);

  return response.status(200).send();
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const task = user.todos.find(task => task.id === id);

  if (!task) return response.status(404).json({
    error: "Task not found!"
  });

  task.done = true;

  return response.status(200).send();
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const task = user.todos.find(task => task.id === id);

  if (!task) return response.status(404).json({
    error: "Task not found!"
  });

  user.todos = user.todos.filter(task => task.id !== id);

  return response.status(200).send();
});

module.exports = app;