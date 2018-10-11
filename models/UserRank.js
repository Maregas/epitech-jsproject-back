const Sequelize = require('sequelize');
const db = require('../controlers/sequelize').dbcongfig;
const mUser = require('./User');
const mRank = require('./Rank');


const mUserRank = db.define('UserRank', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
});

mUserRank.belongsTo(mUser, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});
mUser.hasMany(mUserRank, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});

mUserRank.belongsTo(mRank, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});

mRank.hasOne(mUserRank, {
    foreignKey: {
        allowNull: false
    },
    onDelete: 'CASCADE'
});

mUserRank.sync({
//    force: true
})

module.exports = mUserRank;