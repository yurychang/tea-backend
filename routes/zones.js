const express = require('express');
const router = express.Router();
const { Companys, Zones } = require("../migrations/associations")
const Sequelize = require('sequelize')
const { msgSuccess, msgFail } = require('../libs/resMsg')

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
    res.json(msgSuccess(zones))
  } catch (error) {
    res.json(msgFail())
  }
})

module.exports = router
