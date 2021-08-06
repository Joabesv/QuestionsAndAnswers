import Sequelize from 'sequelize';

import connection from './database.js';

const Question = connection.define('questions', {
  title: {
    type: Sequelize.STRING, // textos curtos
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT, // textos longos
    allowNull: false,
  },
});

Question.sync({ force: false }).then(() => {});

export default Question;
