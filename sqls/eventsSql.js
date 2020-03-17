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

sequelize.sync()

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
class EventsSql extends Sequelize.Model { }

EventsSql.init({
  title: {
    type: Sequelize.STRING(25),
    allowNull: false
  },
  location: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  banner: {
    type: Sequelize.STRING(50)
  },
  content: {
    type: Sequelize.STRING(10000)
  },
  price: {
    type: Sequelize.INTEGER(20)
  },
  isOpen: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  startTime: {
    type: Sequelize.DATE
  },
  endTime: {
    type: Sequelize.DATE
  },
  limitNum: {
    type: Sequelize.INTEGER
  },
  type: Sequelize.STRING(10)
}, {
  sequelize,
  modelName: 'events'
})

module.exports = EventsSql
