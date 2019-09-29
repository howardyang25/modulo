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
        connection.query('UPDATE globalTasks SET accepted = accepted + 1 WHERE id = ?', [globalTaskId], () => {
          connection.query('INSERT INTO userTasks (userId, globalTaskId, checkedOff) VALUES (?, ?, false);',
            [userId, globalTaskId], (error, results) => {
              if (error) {
                cb(error);
              } else {
                cb(null, results);
              }
            });
        });
      }
    });
};

const getUserTasks = (userId, cb) => {
  connection.query('SELECT u.id, u.checkedOff, u.createdAt, u.updatedAt, u.globalTaskId, g.description, g.accepted, g.completed FROM globalTasks g INNER JOIN userTasks u WHERE u.globalTaskId = g.id and u.userID = ? ORDER BY u.createdAt DESC', [userId], (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(null, results);
    }
  });
};

const markUserTaskComplete = (userTaskId, globalTaskId, cb) => {
  connection.query('UPDATE userTasks SET checkedOff = true WHERE id = ?', [userTaskId], () => {
    connection.query('UPDATE globalTasks SET completed = completed + 1 WHERE id = ?', [globalTaskId], () => {
      cb();
    });
  });
};

module.exports.addUserTask = addUserTask;
module.exports.getUserTasks = getUserTasks;
module.exports.markUserTaskComplete = markUserTaskComplete;
