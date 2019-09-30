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

module.exports.addShoutout = addShoutout;
