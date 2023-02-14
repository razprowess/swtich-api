import { Sequelize } from "sequelize";

const database = new Sequelize('switch', 'root', '', {dialect: 'mariadb'});

try {
    await database.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

export default database;