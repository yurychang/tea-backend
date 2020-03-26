const express = require('express');
const router = express.Router();
const EventsRegisters = require('../migrations/eventsRegisters')
const Sequelize = require('sequelize')
const eventRegister = require('../Models/event/eventRegister')
const { msgSuccess, msgFail } = require('../libs/resMsg')

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
