const express = require('express');
const router = express.Router();
const EventsSql = require('../sqls/eventsSql')
const { CompanysSql } = require("../sqls/associations")
const Sequelize = require('sequelize')

// get Events
router.get('/get', async function (req, res) {
  try {
    const events = await EventsSql.findAll({
      include: [{
        model: CompanysSql,
        where: { id: Sequelize.col('events.cId') },
        attributes: ['id', 'username']
      }]
    })
    res.json(events)
  } catch (error) {
    res.json('err')
  }
});

router.get('/getCompanys', async function (req, res) {
  try {
    const companys = await CompanysSql.findAll({ attributes: ['id', 'username'] })
    res.json(companys)
  } catch (error) {
    res.json('err')
  }
})

module.exports = router;
