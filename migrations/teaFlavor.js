const Sequelize = require('sequelize');
const sequelize = require('./sequelize')
const TeaType = require('./teaType')
const OuterFlavor = require('./outerFlavor')

class TeaFlavor extends Sequelize.Model { }

TeaFlavor.init({
  name: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  tId: {
    type: Sequelize.INTEGER,
    references: {
      model: TeaType,
      key: 'id',
    }
  },
  frontId: {
    type: Sequelize.INTEGER,
    references: {
      model: OuterFlavor,
      key: 'id',
    }
  },
  midId: {
    type: Sequelize.INTEGER,
    references: {
      model: OuterFlavor,
      key: 'id',
    }
  },
  endId: {
    type: Sequelize.INTEGER,
    references: {
      model: OuterFlavor,
      key: 'id',
    }
  },
  frontText: {
    type: Sequelize.STRING(20)
  },
  midText: {
    type: Sequelize.STRING(20)
  },
  endText: {
    type: Sequelize.STRING(20)
  },
}, {
  sequelize,
  modelName: 'teaflavor'
})

module.exports = TeaFlavor
