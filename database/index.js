const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = new Sequelize('modulo', 'root', '', {
  dialect: 'mysql',
  port: 3306,
});

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  salt: Sequelize.STRING,
});

const addUser = ({ username, password }) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return User.create({
    username,
    salt,
    password: hash,
  });
};

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });

module.exports.addUser = addUser;
