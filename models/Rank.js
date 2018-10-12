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
    icon_URI: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

mRank.belongsTo(mGame, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});


mRank.sync({
    force: true
})

module.exports = mRank;