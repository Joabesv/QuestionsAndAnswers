const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(
  process.env.database,
  process.env.user,
  process.env.password,
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = connection;

/*
process.env.database
process.env.user
process.env.password
*/
