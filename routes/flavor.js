const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize')
const { msgSuccess, msgFail } = require('../libs/resMsg')
const { InnerFlavor, OuterFlavor, TeaFlavor } = require('../migrations/associations')

/* GET home page. */
router.get('/get', async function (req, res) {
  try {
    const flavors = await InnerFlavor.findAll({
      include: [{
        model: OuterFlavor,
        where: { id: Sequelize.col('InnerFlavor.id') },
      }]
    })
    const teaFlavors = await TeaFlavor.findAll()
    res.json(msgSuccess({ flavors, teaFlavors }))
  } catch (error) {
    console.log(error)
    res.json('err')
  }
});

router.get('/tea/get', async function (req, res) {
  try {
    const flavors = await TeaFlavor.findAll()
    res.json(flavors)
  } catch (error) {
    console.log(error)
    res.json(msgFail())
  }
});

module.exports = router;
