const Sequelize = require('sequelize');
const sequelize = require('./sequelize')

class Commodity extends Sequelize.Model { }

Commodity.init({
  title: {
    type: Sequelize.STRING(10),
  },
  price: {
    type: Sequelize.INTEGER(10),
  },
  img: {
    type: Sequelize.STRING(50),
  },
  tag: {
    type: Sequelize.STRING(10),
  },
  idVendor: {
    type: Sequelize.STRING(10),
  },
  feature: {
    type: Sequelize.STRING(300),
  }
}, {
  modelName: 'commodity',
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  sequelize,
})

module.exports = Commodity
