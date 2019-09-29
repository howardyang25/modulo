const Sequelize = require('sequelize');

const sequelize = new Sequelize('modulo', 'root', '', {
  dialect: 'mysql',
  port: 3306,
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });
