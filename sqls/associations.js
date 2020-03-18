const CompanysSql = require('./companysSql')
const ZonesSql = require('./zonesSql')

CompanysSql.belongsTo(ZonesSql, {foreignKey: 'zoneId'})
ZonesSql.hasMany(CompanysSql, {foreignKey: 'zoneId'})

module.exports = {
  CompanysSql,
  ZonesSql
}
