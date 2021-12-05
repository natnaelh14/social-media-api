const Sequelize = require('sequelize');
require('dotenv').config();
// Create connection to our db
const connect = () => {
  try {
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: 'mysql_server',
        dialect: 'mysql',
        port: 3306,
      }
    );
    return sequelize
  } catch (e) {
    console.log(e)
  }
}


module.exports = connect();