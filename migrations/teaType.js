const Sequelize = require('sequelize');
const sequelize = require('./sequelize')

class TeaType extends Sequelize.Model { }

TeaType.init({
  name: {
    type: Sequelize.STRING(20),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'teatype'
})

module.exports = TeaType
