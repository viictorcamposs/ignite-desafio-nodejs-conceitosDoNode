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

  request.username = user;

  return next();
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const userAlreadyExists = users.find(
    (user) => user.username === username
  );

  if (userAlreadyExists) return response.status(400).json({
    error: 'Error while we tried to create user with this username.'
  });

  const user = {
    id: uuid(),
    name,
    username,
    todos: [],
  };

  users.push(user);

  return response.status(201).json(user);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { username } = request;

  return response.status(200).json(username.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { username } = request;
  const { title, deadline } = request.body;

  const task = {
    id: uuid(),
    done: false,
    title,
    deadline: new Date(deadline),
    created_at: new Date(),
  };

  username.todos.push(task);

  return response.status(201).json(task);
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { username } = request;
  const { id } = request.params;
  const { title, deadline } = request.body;

  const task = username.todos.find(
    (todo) => todo.id === id
  );

  if (!task) return response.status(404).json({
    error: "Task not found!"
  });

  task.title = title;
  task.deadline = new Date(deadline);

  return response.status(200).json(task);
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { username } = request;
  const { id } = request.params;

  const task = username.todos.find(task => task.id === id);

  if (!task) return response.status(404).json({
    error: "Task not found!"
  });

  task.done = true;

  return response.status(200).json(task);
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { username } = request;
  const { id } = request.params;

  const task = username.todos.find(task => task.id === id);

  if (!task) return response.status(404).json({
    error: "Task not found!"
  });

  username.todos = username.todos.filter(task => task.id !== id);

  return response.status(204).send();
});

module.exports = app;