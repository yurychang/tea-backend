const Sequelize = require('sequelize');
const sequelize = require('./sequelize')
const Companys = require('./companys')

class Events extends Sequelize.Model { }

Events.init({
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
<<<<<<< HEAD:sqls/eventsSql.js
      model: CompanysSql,
=======
      model: Companys,
>>>>>>> peter:migrates/events.js
      key: 'id',
    }
  }
}, {
  sequelize,
  modelName: 'events'
})

<<<<<<< HEAD:sqls/eventsSql.js
EventsSql.belongsTo(CompanysSql, {foreignKey: 'cId'})
=======
Events.belongsTo(Companys, {foreignKey: 'cId'})
>>>>>>> peter:migrates/events.js

module.exports = Events
