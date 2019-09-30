const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'modulo',
});

connection.connect();

const addShoutout = (globalTaskId, userTaskId, cb) => {
  connection.query('SELECT id FROM userTasks WHERE globalTaskId = ? AND id <> ? ORDER BY RAND() LIMIT 1', 
    [globalTaskId, userTaskId], (err, result) => {
      const randomUserTaskId = result[0].id;
      connection.query('INSERT INTO shoutouts (userTaskId, message) VALUES (?, ?)',
        [randomUserTaskId, 'test post no upvote'], cb());
    });

  // connection.query('SELECT * FROM userTasks WHERE userId = ? and globalTaskId = ?',
  //   [userId, globalTaskId],
  //   (err, result) => {
  //     if (result.length === 0) {
  //       connection.query('UPDATE globalTasks SET accepted = accepted + 1 WHERE id = ?', [globalTaskId], () => {
  //         connection.query('INSERT INTO userTasks (userId, globalTaskId, checkedOff) VALUES (?, ?, false);',
  //           [userId, globalTaskId], (error, results) => {
  //             if (error) {
  //               cb(error);
  //             } else {
  //               cb(null, results);
  //             }
  //           });
  //       });
  //     }
  //   });
};

// const getUserTasks = (userId, cb) => {
//   connection.query('SELECT u.id, u.checkedOff, u.createdAt, u.updatedAt, u.globalTaskId, g.description, g.accepted, g.completed FROM globalTasks g INNER JOIN userTasks u WHERE u.globalTaskId = g.id and u.userID = ? ORDER BY u.createdAt DESC', [userId], (err, results) => {
//     if (err) {
//       cb(err);
//     } else {
//       cb(null, results);
//     }
//   });
// };

module.exports.addShoutout = addShoutout;
