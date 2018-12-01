const Sequelize = require('sequelize');
const db = require('../controllers/sequelize').dbcongfig;
const mGame = require('./Game')

const mRank = db.define('Rank', {
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
    icon_url: {
        type: Sequelize.STRING,
        allowNull: true
    },
    position: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    subrank: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

mRank.belongsTo(mGame, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});

mGame.hasMany(mRank, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});


mRank.sync();

module.exports = mRank;