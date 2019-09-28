const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { check, validationResult } = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { addUser, getUserByUsername, getUserById, comparePassword } = require('../database/index.js');

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Modulo is listening on port ${port}!`);
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/api/session', (req, res) => {
  res.send(req.user);
});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.resolve(__dirname, '..', 'public') });
});


app.post('/register', [
  check('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
  check('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send(errors.errors);
  }
  
  addUser(req.body)
    .then(() => {
      return res.status(201).send('Success');
    });
});

passport.use(new LocalStrategy((username, password, done) => {
  getUserByUsername(username)
    .then((user) => {
      if (user === null) {
        return done(null, false, { message: 'Unknown User' });
      }

      comparePassword(password, user.dataValues.password)
        .then((isMatch) => {
          if (isMatch) {
            return done(null, user.dataValues);
          }

          return done(null, false, { message: 'Invalid password' });
        });
    })
    .catch((err) => {
      console.log(err);
    });
}));

passport.serializeUser((user, done) => {
  console.log('serializing');
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('deserializing');
  getUserById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

app.post(
  '/login',
  passport.authenticate('local'),
  (req, res) => {
    res.send(req.user);
  },
);
