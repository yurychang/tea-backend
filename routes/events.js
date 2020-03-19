const express = require('express');
const router = express.Router();
const Events = require('../migrations/events')
const EventsRegisters = require('../migrations/eventsRegisters')
const { Companys } = require("../migrations/associations")
const Sequelize = require('sequelize')

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
    res.json(events)
  } catch (error) {
    res.json('err')
  }
});

router.post('/register/post', async function (req, res) {
  try {
    console.log(req.body)
    res.json('register/post')
  } catch (error) {
    res.json('err')
  }
})

router.get('/register/get', async function (req, res) {
  console.log(req.body)
  try {
    const registers = await EventsRegisters.findAll({
      include: [{
        model: Companys,
        where: { id: Sequelize.col('eventregisters.cId') },
        attributes: ['id', 'username']
      }]
    })
    res.json(registers)
  } catch (error) {
    console.log(error)
    res.json('err')
  }
})

module.exports = router;
