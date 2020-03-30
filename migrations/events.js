const Sequelize = require('sequelize');
const sequelize = require('./sequelize')
const Companys = require('./companys')
const VendorData = require('./vendorData')

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
  intro: {
    type: Sequelize.STRING(30)
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
    type: Sequelize.INTEGER(10),
    references: {
      // model: Companys,
      model: VendorData,
      key: 'id',
    }
  }
}, {
  sequelize,
  modelName: 'events'
})

module.exports = Events
