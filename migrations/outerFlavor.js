const Sequelize = require('sequelize');
const sequelize = require('./sequelize')
const InnerFlavor = require('./innerFlavor')

class OuterFlavor extends Sequelize.Model { }

OuterFlavor.init({
  name: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  innerId: {
    type: Sequelize.INTEGER,
    references: {
      model: InnerFlavor,
      key: 'id',
    }
  }
}, {
  sequelize,
  modelName: 'outerflavor'
})

module.exports = OuterFlavor
