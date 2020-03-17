const express = require('express');
const router = express.Router();
const EventsSql = require('../sqls/eventsSql')

// get Events
router.get('/get', async function(req, res) {
  const events = await EventsSql.findAll()
  console.log(events)
  res.json(events);
});

module.exports = router;
