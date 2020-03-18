const express = require('express');
const router = express.Router();
const { CompanysSql, ZonesSql } = require("../sqls/associations")
const Sequelize = require('sequelize')

router.get('/get', async function (req, res) {
  try {
    const zones = await ZonesSql.findAll({
      attributes: [['id', 'zId'], ['name', 'zone']],
      include: [{
        model: CompanysSql,
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
