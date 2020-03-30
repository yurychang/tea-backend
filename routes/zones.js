const express = require('express');
const router = express.Router();
const { VendorData, Zones } = require("../migrations/associations")
const Sequelize = require('sequelize')
const { msgSuccess, msgFail } = require('../libs/resMsg')

router.get('/get', async function (req, res) {
  try {
    const zones = await Zones.findAll({
      attributes: [['id', 'zId'], ['name', 'zone']],
      include: [{
        model: VendorData,
        as: 'companys',
        where: { zoneId: Sequelize.col('zones.id') },
        // attributes: ['id', ['username', 'name']] 
        attributes: ['id', ['vendorName', 'name']]
      }]
    })
    res.json(msgSuccess(zones))
  } catch (error) {
    res.json(msgFail())
  }
})

module.exports = router
