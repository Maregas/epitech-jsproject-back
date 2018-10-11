const Sequelize = require('sequelize');
const db = require('../controlers/sequelize').dbcongfig;

const mGame = db.define('Game', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    unique: true,
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  background_image_URI: {
    type: Sequelize.STRING,
    allowNull: true
  },
});

mGame.sync({
  // force: true
})

module.exports = mGame;