const Sequelize = require('sequelize');
const sequelize = require('./sequelize')
const Zones = require('./zones')

class Companys extends Sequelize.Model { }

Companys.init({
  username: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  zoneId: {
    type: Sequelize.STRING(10),
    allowNull: false,
    references: {
      model: Zones,
      key: 'id',
    }
  }
}, {
  sequelize,
  modelName: 'companys'
})

// Companys.belongsTo(Zones, {foreignKey: 'zoneId'})

module.exports = Companys
