const CompanysSql = require('./companysSql')
const ZonesSql = require('./zonesSql')

CompanysSql.belongsTo(ZonesSql, {foreignKey: 'zoneId', constraints: false})
ZonesSql.hasMany(CompanysSql, {foreignKey: 'zoneId', constraints: false})

module.exports = {
  CompanysSql,
  ZonesSql
}
