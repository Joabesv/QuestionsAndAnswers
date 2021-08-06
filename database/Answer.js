import Sequelize from 'sequelize';

import connection from './database.js';

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

export default Answer;
