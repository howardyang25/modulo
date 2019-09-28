const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = new Sequelize('modulo', 'root', '', {
  dialect: 'mysql',
  port: 3306,
});

const GlobalTask = sequelize.define('globalTask', {
  description: Sequelize.STRING,
  createdBy: Sequelize.INTEGER,
  upvotes: Sequelize.INTEGER,
  accepted: Sequelize.INTEGER,
  completed: Sequelize.INTEGER,
});

const addGlobalTask = ({ userId, description }) => {
  return GlobalTask.create({
    description,
    createdBy: userId,
    upvotes: 0,
    accepted: 0,
    completed: 0,
  });
};

const getGlobalTasks = () => {
  return GlobalTask.findAll();
};

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
