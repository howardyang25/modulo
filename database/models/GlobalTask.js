// const Sequelize = require('sequelize');
const mysql = require('mysql');

// const sequelize = new Sequelize('modulo', 'root', '', {
//   dialect: 'mysql',
//   port: 3306,
// });

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'modulo',
});

connection.connect();

// const GlobalTask = sequelize.define('globalTask', {
//   description: Sequelize.STRING,
//   createdBy: Sequelize.INTEGER,
//   upvotes: Sequelize.INTEGER,
//   accepted: Sequelize.INTEGER,
//   completed: Sequelize.INTEGER,
// });

const addGlobalTask = ({ userId, description }) => {
  return Promise.resolve(connection.query('INSERT INTO globalTasks (createdBy, description, accepted, completed) VALUES (?, ?, 0, 0);',
    [userId, description]));
};

const getGlobalTasks = (sortQuery, cb) => {
  connection.query(`Select g.id, u.username, g.description, g.accepted, g.completed, g.createdAt FROM users u INNER JOIN globalTasks g ON u.id = g.createdBy ORDER BY ${sortQuery} DESC`, (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(null, results);
    }
  });
};

// select g.id, u.username, g.description, g.upvotes, g.accepted, g.completed, g.createdAt FROM users u INNER JOIN globalTasks g ON u.id = g.createdBy;
// const getUserByUsername = (username) => {
//   return User.findOne({ where: { username } });
// };

// const getUserById = (id) => {
//   return User.findOne({ where: { id } });
// };

// const comparePassword = (candidatePassword, hash) => {
//   return Promise.resolve((bcrypt.compareSync(candidatePassword, hash)));
// };

module.exports.addGlobalTask = addGlobalTask;
module.exports.getGlobalTasks = getGlobalTasks;
