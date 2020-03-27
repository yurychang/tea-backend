const Companys = require('./companys')
const Zones = require('./zones')
const InnerFlavor = require('./innerFlavor')
const OuterFlavor = require('./outerFlavor')
const TeaFlavor = require('./teaFlavor')
const Events = require('./events')
const EventsRegisters = require('./eventsRegisters')

Events.belongsTo(Companys, {foreignKey: 'cId', constraints: false})

EventsRegisters.belongsTo(Companys, {foreignKey: 'cId', constraints: false})

EventsRegisters.belongsTo(Events, {foreignKey: 'eId', constraints: false})

Companys.belongsTo(Zones, {foreignKey: 'zoneId', constraints: false})

Zones.hasMany(Companys, {foreignKey: 'zoneId', constraints: false})

InnerFlavor.hasMany(OuterFlavor, {foreignKey: 'innerId', constraints: false})


module.exports = {
  Companys,
  Zones,
  InnerFlavor,
  OuterFlavor,
  TeaFlavor,
  Events,
  EventsRegisters
}
