const express = require('express');
const router = express.Router();
const Companys = require('../migrates/companys')

/* GET home page. */
router.get('/get', async function (req, res) {
  try {
    const companys = await Companys.findAll({ attributes: { exclude: ['password'] } })
    res.json(companys)
  } catch (error) {
    console.log(error)
    res.json('err')
  }
});

module.exports = router;
