const { database, username, password, host } = require(__dirname + '/../config/dbConfig');
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  database,
  username,
  password,
  host,
  dialect: 'mariadb',
  define: {
    freezeTableName: true
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync()

module.exports = sequelize
