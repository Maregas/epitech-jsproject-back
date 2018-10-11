const Sequelize = require('sequelize');

const dbcongfig = new Sequelize('rateyoursync', 'null', 'null', {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: 'db/database.sqlite',

  logging: false
});

const sessionSequelize = new Sequelize("session", "null", "null", {
    dialect: "sqlite",
    storage: "db/session.sqlite",
    operatorsAliases: false,
    logging: false
  });

module.exports.dbcongfig = dbcongfig;
module.exports.sessionConfig = sessionSequelize;