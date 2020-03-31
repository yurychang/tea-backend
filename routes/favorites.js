const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { Commodity, Favorites } = require('../migrations/associations')

router.get('/get', async function (req, res) {
  try {
    const favorites = await Favorites.findAll({
      include: [{
        model: Commodity,
        where: { id: Sequelize.col('Favorites.id') },
      }]
    })
    res.json(favorites)
  } catch (error) {
    console.log(error)
    res.json('err')
  }
});

router.post('/add', async function (req, res) {
  const pId = req.body.pId
  try {
    await Favorites.findOrCreate({ where: { mId: 13, pId }, defaults: { mId: 13, pId } })
    const favorites = await Favorites.findAll({
      include: [{
        model: Commodity,
        where: { id: Sequelize.col('Favorites.id') },
      }]
    })
    res.json(favorites)
  } catch (error) {
    console.log(error)
    res.json('err')
  }
});

module.exports = router;
