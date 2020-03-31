// const Companys = require('./companys')
const Zones = require('./zones')
const InnerFlavor = require('./innerFlavor')
const OuterFlavor = require('./outerFlavor')
const TeaFlavor = require('./teaFlavor')
const Events = require('./events')
const EventsRegisters = require('./eventsRegisters')
const VendorData = require('./vendorData')
const Commodity = require('./commodity')
const Favorites = require('./favorites')

// Events.belongsTo(Companys, { foreignKey: 'cId' })
Events.belongsTo(VendorData, { foreignKey: 'cId', as: 'companys' })

// EventsRegisters.belongsTo(Companys, { foreignKey: 'cId' })
EventsRegisters.belongsTo(VendorData, { foreignKey: 'cId' })

EventsRegisters.belongsTo(Events, { foreignKey: 'eId' })

// Companys.belongsTo(Zones, { foreignKey: 'zoneId' })
VendorData.belongsTo(Zones, { foreignKey: 'zoneId' })

// Zones.hasMany(Companys, { foreignKey: 'zoneId' })
Zones.hasMany(VendorData, { foreignKey: 'zoneId', as: 'companys' })

InnerFlavor.hasMany(OuterFlavor, { foreignKey: 'innerId' })

Favorites.belongsTo(Commodity, { foreignKey: 'pId' })

module.exports = {
  Zones,
  InnerFlavor,
  OuterFlavor,
  TeaFlavor,
  Events,
  EventsRegisters,
  VendorData,
  Favorites,
  Commodity
}
