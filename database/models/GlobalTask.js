const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'modulo',
});

connection.connect();


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

module.exports.addGlobalTask = addGlobalTask;
module.exports.getGlobalTasks = getGlobalTasks;
