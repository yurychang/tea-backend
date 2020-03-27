const express = require('express');
const multer = require('multer');
const router = express.Router();
const { Companys, Events } = require("../migrations/associations")
const Sequelize = require('sequelize')
const { msgSuccess, msgFail } = require('../libs/resMsg')
const addEvent = require('../Models/event/addEvent')
const editEvent = require('../Models/event/editEvent')
const deleteEvent = require('../Models/event/deleteEvent')

const banner = multer({
  dest: 'public/event/tmp/',
  fileFilter: (req, file, cb) => {
    switch (file.mimetype) {
      case 'image/jpeg':
        file.ext = 'jpg'
        cb(null, true)
        break;
      case 'image/png':
        file.ext = 'png'
        cb(null, true)
        break;
      case 'image/gif':
        file.ext = 'gif'
        cb(null, true)
        break;
      case 'image/svg+xml':
        file.ext = 'svg'
        cb(null, true)
        break;
      default:
        cb(new Error(''))
        break;
    }
  }
}).single('banner')

// get Events
router.get('/get', async function (req, res) {
  try {
    let events = await Events.findAll({
      include: [{
        model: Companys,
        where: { id: Sequelize.col('events.cId') },
        attributes: ['id', 'username']
      }]
    })
    events = events.map(event => {
      event.banner = 'http://localhost:3333/event/images/' + event.banner
      return event
    })
    res.json(msgSuccess(events))
  } catch (error) {
    res.json(msgFail())
  }
});

router.post('/add', banner, async function (req, res) {
  const reqData = {
    ...req.body,
    banner: req.file
  }
  const result = await addEvent(reqData)
  if (result.status) {
    res.json(msgSuccess())
  } else {
    res.json(msgFail(null, result.msg))
  }
});

router.put('/edit', banner, async function (req, res) {
  const { id, ...attrs } = req.body
  let result = null
  if (req.file) {
    result = await editEvent(id, { ...attrs, banner: req.file })
  } else {
    result = await editEvent(id, attrs)
  }
  result.status ? res.json(msgSuccess(result.data)) : res.json(msgFail(null, result.msg))
});

router.delete('/delete', async function (req, res) {
  console.log(req.body)
  deleteEvent(req.body.id)
  res.json(msgSuccess())

});

module.exports = router;
