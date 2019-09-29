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

const getUserByUsername = (username) => {
  return User.findOne({ where: { username } });
};

const getUserById = (id) => {
  return User.findOne({ where: { id } });
};

const comparePassword = (candidatePassword, hash) => {
  return Promise.resolve((bcrypt.compareSync(candidatePassword, hash)));
};

module.exports.addUser = addUser;
module.exports.getUserByUsername = getUserByUsername;
module.exports.getUserById = getUserById;
module.exports.comparePassword = comparePassword;
