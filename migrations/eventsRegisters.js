const Sequelize = require('sequelize');
const sequelize = require('./sequelize')
const Companys = require('./companys')
const Events = require('./events')

class EventsRegisters extends Sequelize.Model { }

EventsRegisters.init({
  cId: {
    type: Sequelize.INTEGER,
    references: {
      model: Companys,
      key: 'id',
    }
  },
  eId: {
    type: Sequelize.INTEGER(10),
    references: {
      model: Events,
      key: 'id',
    }
  },
  name: {
    type: Sequelize.STRING(20),
  },
  phone: {
    type: Sequelize.STRING(20),
  },
  email: {
    type: Sequelize.STRING(50),
    validate: {isEmail: true}
  },
  note: {
    type: Sequelize.STRING(200),
  },
  date: {
    type: Sequelize.STRING(20),
    validate: {isAfter: Date()}
  },
  time: {
    type: Sequelize.TIME
  },
  num: {
    type: Sequelize.INTEGER,
  },
}, {
  sequelize,
  modelName: 'eventregisters'
})

EventsRegisters.belongsTo(Companys, {foreignKey: 'cId'})
EventsRegisters.belongsTo(Events, {foreignKey: 'eId'})

module.exports = EventsRegisters
