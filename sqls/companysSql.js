const Sequelize = require('sequelize');
const sequelize = require('./sequelize')
const ZonesSql = require('./zonesSql')

class CompanysSql extends Sequelize.Model { }

CompanysSql.init({
  username: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  zoneId: {
    type: Sequelize.INTEGER,
    references: {
      model: ZonesSql,
      key: 'id',
    }
  }
}, {
  sequelize,
  modelName: 'companys'
})

// CompanysSql.belongsTo(ZonesSql, {foreignKey: 'zoneId'})

module.exports = CompanysSql
