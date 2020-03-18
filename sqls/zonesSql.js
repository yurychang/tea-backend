const Sequelize = require('sequelize');
const sequelize = require('./sequelize')
const CompanysSql = require('./companysSql')

class ZonesSql extends Sequelize.Model { }

ZonesSql.init({
  name: {
    type: Sequelize.STRING(10),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'zones'
})

module.exports = ZonesSql
