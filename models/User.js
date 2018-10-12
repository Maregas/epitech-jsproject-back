const Sequelize = require('sequelize');
const db = require('../controllers/sequelize').dbcongfig;

const mUser = db.define('User', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  nickname: {
    unique: true,
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    unique: true,
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },

});

mUser.sync({
 // force: true
})

module.exports = mUser;