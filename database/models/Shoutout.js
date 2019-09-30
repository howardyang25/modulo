const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'modulo',
});

connection.connect();

const addShoutout = (globalTaskId, userTaskId, message, cb) => {
  connection.query('SELECT id FROM userTasks WHERE globalTaskId = ? ORDER BY RAND() LIMIT 1', 
    [globalTaskId, userTaskId], (err, result) => {
      const randomUserTaskId = result[0].id;
      connection.query('INSERT INTO shoutouts (userTaskId, message) VALUES (?, ?)',
        [randomUserTaskId, message], cb());
    });
};

const getShoutouts = (userTaskId, cb) => {
  connection.query('SELECT message, id FROM shoutouts WHERE userTaskId = ? LIMIT 1',
    [userTaskId], (err, result) => {
      if (err) {
        cb(err);
      } else {
        console.log(result[0]);
        if (result[0] !== undefined) {
          connection.query('DELETE FROM shoutouts WHERE id = ?', [result[0].id]);
        }

        cb(null, result);
      }
    });
};

module.exports.addShoutout = addShoutout;
module.exports.getShoutouts = getShoutouts;
