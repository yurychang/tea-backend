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
    type: Sequelize.INTEGER(10),
    references: {
      model: TeaType,
      key: 'id',
    }
  },
  frontId: {
    type: Sequelize.INTEGER(10)
  },
  midId: {
    type: Sequelize.INTEGER(10)
  },
  endId: {
    type: Sequelize.INTEGER(10)
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
  intro: {
    type: Sequelize.STRING(200)
  },
}, {
  sequelize,
  modelName: 'teaflavor'
})

module.exports = TeaFlavor
