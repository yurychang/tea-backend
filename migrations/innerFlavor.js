const Sequelize = require('sequelize');
const sequelize = require('./sequelize')

class InnerFlavor extends Sequelize.Model { }

InnerFlavor.init({
  name: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  sortOrder: {
    type: Sequelize.INTEGER(10)
  },
  color: {
    type: Sequelize.STRING(10),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'innerflavor'
})

module.exports = InnerFlavor
