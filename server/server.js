const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { check, validationResult } = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const { addUser, getUserByUsername, getUserById, comparePassword } = require('../database/models/User.js');
const { addGlobalTask, getGlobalTasks } = require('../database/models/GlobalTask.js');
const { addUserTask, getUserTasks, markUserTaskComplete } = require('../database/models/UserTask.js');
const { addShoutout, getShoutouts } = require('../database/models/Shoutout.js');


const app = express();
const port = 3000;
const config = new aws.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-west-1',
});
const s3 = new aws.S3({ apiVersion: '2006-03-01' });

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'howard-yang-modulo',
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `${req.params.username}.jpg`);
    },
  }),
});

app.listen(port, () => {
  console.log(`Modulo is listening on port ${port}!`);
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use('/users/:username', express.static(path.resolve(__dirname, '..', 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/api/session', (req, res) => {
  res.send(req.user);
});

app.get('/api/logout', (req, res) => {
  req.logout();
  res.end();
});

app.get('/api/global-tasks', (req, res) => {
  getGlobalTasks(req.query.sort, (err, response) => {
    if (err) {
      res.send(err);
    }

    res.send(response);
  });
});

app.get('/api/:userid/user-tasks', (req, res) => {
  getUserTasks(req.params.userid, (err, response) => {
    if (err) {
      res.send(err);
    }

    res.send(response);
  });
});

app.get('/api/shoutouts/:userTaskId', (req, res) => {
  getShoutouts(req.params.userTaskId, (err, result) => {
    if (err) {
      res.send(err);
    }

    res.send(result);
  });
});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.resolve(__dirname, '..', 'public') });
});

app.post('/api/global-tasks', (req, res) => {
  req.body.userId = req.user.dataValues.id;
  addGlobalTask(req.body)
    .then(() => {
      res.status(201).send('Success');
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post('/api/user-tasks', (req, res) => {
  addUserTask(req.body.userId, req.body.globalTaskId, (err, response) => {
    if (err) {
      res.send(err);
    }

    res.status(201).send(response);
  });
});

app.put('/api/user-tasks/:id', (req, res) => {
  markUserTaskComplete(req.params.id, req.body.globalTaskId, (err) => {
    if (err) {
      res.send(err);
    }

    res.sendStatus(200);
  });
});

app.post('/api/shoutouts', (req, res) => {
  const { globalTaskId, userTaskId, message } = req.body;
  addShoutout(globalTaskId, userTaskId, message, () => {
    res.status(201).send('success');
  });
});

app.post('/api/users/:username/avatar', upload.single('avatar'), (req, res) => {
  console.log(req.file);
  res.status(201).send('Profile picture uploaded successfully!');
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
