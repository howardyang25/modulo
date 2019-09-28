const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { check, validationResult } = require('express-validator');
const { addUser } = require('../database/index.js');

console.log(addUser);

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Modulo is listening on port ${port}!`);
});

app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.resolve(__dirname, '..', 'public') });
});

app.post('/register', [
  check('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
  check('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
], (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send(errors.errors);
  }
  
  addUser(req.body)
    .then(() => {
      return res.status(201).send('Success');
    });
});
