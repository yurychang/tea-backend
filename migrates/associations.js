const Companys = require('./companys')
const Zones = require('./zones')

Companys.belongsTo(Zones, {foreignKey: 'zoneId'})
Zones.hasMany(Companys, {foreignKey: 'zoneId'})

module.exports = {
  Companys,
  Zones
}
