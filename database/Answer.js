const Sequelize = require('sequelize');
const connection = require('./database');

const Answer = connection.define('answers', {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  questionId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Answer.sync({ force: false });

module.exports = Answer;
