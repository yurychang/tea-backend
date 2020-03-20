const express = require('express');
const router = express.Router();
const Events = require('../migrations/events')
const EventsRegisters = require('../migrations/eventsRegisters')
const { Companys } = require("../migrations/associations")
const Sequelize = require('sequelize')
const eventRegister = require('../Models/eventRegister')
const { msgSuccess, msgFail } = require('../lib/resMsg')
// get Events
router.get('/get', async function (req, res) {
  try {
    const events = await Events.findAll({
      include: [{
        model: Companys,
        where: { id: Sequelize.col('events.cId') },
        attributes: ['id', 'username']
      }]
    })
    res.json(msgSuccess(events))
  } catch (error) {
    res.json(msgFail())
  }
});

router.get('/register/get', async function (req, res) {
  try {
    // const registers = await EventsRegisters.findAll({
    //   include: [{
    //     model: Companys,
    //     where: { id: Sequelize.col('eventregisters.cId') },
    //     attributes: ['id', 'username']
    //   }]
    // })
    const registers = await EventsRegisters.findAll()
    res.json(res.json(msgSuccess(registers)))
  } catch (error) {
    res.json(msgFail())
  }
})

router.post('/register/post', async function (req, res) {
  try {
    const data = await eventRegister(req.body)
    if (data) {
      res.json(msgSuccess(data))
    } else {
      res.json(msgFail())
    }
  } catch (error) {
    res.json(msgFail())
  }
})

module.exports = router;
