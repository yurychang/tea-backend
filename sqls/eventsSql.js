const Sequelize = require('sequelize');
const sequelize = require('./sequelize')
const CompanysSql = require('./companysSql')

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
  cId: {
    type: Sequelize.INTEGER,
    references: {
      model: CompanysSql,
      key: 'id',
    }
  }
}, {
  sequelize,
  modelName: 'events'
})

EventsSql.belongsTo(CompanysSql, {foreignKey: 'cId'})

module.exports = EventsSql
