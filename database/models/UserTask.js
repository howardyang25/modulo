const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'modulo',
});

connection.connect();

const addUserTask = (userId, globalTaskId, cb) => {
  connection.query('SELECT * FROM userTasks WHERE userId = ? and globalTaskId = ?',
    [userId, globalTaskId],
    (err, result) => {
      if (result.length === 0) {
        connection.query('INSERT INTO userTasks (userId, globalTaskId, completed) VALUES (?, ?, false);',
          [userId, globalTaskId], (error, results) => {
            if (error) {
              cb(error);
            } else {
              cb(null, results);
            }
          });
      }
    });
};

const getUserTasks = (sortQuery, cb) => {
  connection.query(`Select g.id, u.username, g.description, g.accepted, g.completed, g.createdAt FROM users u INNER JOIN globalTasks g ON u.id = g.createdBy ORDER BY ${sortQuery} DESC`, (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(null, results);
    }
  });
};

module.exports.addUserTask = addUserTask;
module.exports.getUserTasks = getUserTasks;
