const Sequelize = require('sequelize');
const sequelize = require('./sequelize')
const Zones = require('./zones')

class VendorData extends Sequelize.Model { }

VendorData.init({
  vendorAccount: {
    type: Sequelize.STRING(20),
  },
  vendorPassword: {
    type: Sequelize.STRING(100),
  },
  vendorEmail: {
    type: Sequelize.STRING(20),
  },
  vendorName: {
    type: Sequelize.STRING(20),
  },
  vendorPhone: {
    type: Sequelize.STRING(20),
  },
  zoneId: {
    type: Sequelize.INTEGER(10),
  },
  vendorZone: {
    type: Sequelize.STRING(2),
    references: {
      model: Zones,
      key: 'id',
    }
  },
  vendorAddress: {
    type: Sequelize.STRING(100),
  },
  vendorImg: {
    type: Sequelize.STRING(800),
  },
  vendorAbout: {
    type: Sequelize.STRING(800),
  },
  vendorBanner: {
    type: Sequelize.STRING(800),
  }
}, {
  sequelize,
  modelName: 'vendordata'
})

module.exports = VendorData
