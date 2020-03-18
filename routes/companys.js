const express = require('express');
const router = express.Router();
const CompanysSql = require('../sqls/companysSql')

/* GET home page. */
router.get('/get', async function (req, res) {
  try {
    const companys = await CompanysSql.findAll({ attributes: { exclude: ['password'] } })
    res.json(companys)
  } catch (error) {
    console.log(error)
    res.json('err')
  }
});

module.exports = router;
