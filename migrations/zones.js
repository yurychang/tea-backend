const Sequelize = require('sequelize');
const sequelize = require('./sequelize')

class Zones extends Sequelize.Model { }

Zones.init({
  name: {
    type: Sequelize.STRING(10),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'zones'
})

module.exports = Zones
