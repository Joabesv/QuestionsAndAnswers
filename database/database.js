import Sequelize from 'sequelize';

import dotenv from 'dotenv';

dotenv.config();

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

export default connection;
