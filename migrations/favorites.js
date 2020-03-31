const Sequelize = require('sequelize');
const sequelize = require('./sequelize')
const Commodity = require('./commodity')

class Favorites extends Sequelize.Model { }

Favorites.init({
  mId: {
    type: Sequelize.STRING(10),
  },
  pId: {
    type: Sequelize.INTEGER(10),
    references: {
      model: Commodity,
      key: 'id',
    }
  }
}, {
  sequelize,
  modelName: 'favorites'
})

module.exports = Favorites
