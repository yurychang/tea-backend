const express = require('express');
const router = express.Router();
const { Companys, Zones } = require("../migrates/associations")
const Sequelize = require('sequelize')

router.get('/get', async function (req, res) {
  try {
    const zones = await Zones.findAll({
      attributes: [['id', 'zId'], ['name', 'zone']],
      include: [{
        model: Companys,
        where: { zoneId: Sequelize.col('zones.id') },
        attributes: ['id', ['username', 'name']]
      }]
    })
    res.json(zones)
  } catch (error) {
    console.log(error)
    res.json('err')
  }
})

module.exports = router
