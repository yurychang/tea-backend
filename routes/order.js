const express = require('express');
const router = express.Router();
const db = require('../migrations/_connect_db')
const multer = require('multer');
const upload = multer({ dest: 'tmp_uploads' });
const fs = require('fs');
const vendorVerification = require('../middlewar/vendorVerification')


router.get('/try-get', (req, res) => {
  const sql = "SELECT `id`, `vendorAccount`, `vendorPassword`, `vendorName`, `vendorEmail`, `vendorPhone`, `vendorZone`, `vendorAddress`, `vendorImg`, `vendorAbout`, `vendorBanner`, `createdAt`, `updatedAt` FROM `vendordata` WHERE 1";

  db.query(sql, (error, results, fields) => {
    if (error) throw error
    res.json(results);

  });
  return
});

//廠商列表取得頁面
router.get('/getallvendor', (req, res) => {
  const sql = "SELECT `id`,`vendorName`, `vendorZone`, `vendorImg` FROM `vendordata` WHERE 1";

  db.query(sql, (error, results, fields) => {
    if (error) throw error
    for (i = 0; i < results.length; i++) {
      results[i].vendorImg = "http://localhost:3333/images/" + results[i].vendorImg
    }
    // console.log(results)
    res.json(results);
  });
  return
});



//前端取得某個廠商頁面
router.get('/getvendorpage', (req, res) => {
  const sql = "SELECT `vendorName`, `vendorPhone`, `vendorZone`, `vendorImg`, `vendorAbout`, `vendorBanner` FROM `vendordata` WHERE id='11'";

  db.query(sql, (error, results, fields) => {
    if (error) throw error
    results[0].vendorImg = "http://localhost:3333/images/" + results[0].vendorImg
    results[0].vendorBanner = "http://localhost:3333/images/" + results[0].vendorBanner
    console.log(results);
    res.json(results);
  });
  return
});




// get Events
//廠商註冊API
router.post('/neworderdata', (req, res) => {
  try {
    const data = req.body
    let selectQuery = "SELECT id, title, price FROM commodity WHERE"
    data.detail.forEach(item => selectQuery += ` id = ${item.pId} or`)
    const newSelectQuery = selectQuery.slice(0, selectQuery.length - 2)
    db.query(newSelectQuery, (error, results, fields) => {
      let totalPrice = 0
      const detailAry = []
      data.detail.forEach(item => {
        results.forEach(product => {
          if (product.id === item.pId) {
            const price = item.amount * product.price
            totalPrice += price
            detailAry.push([product.title, product.price, item.amount])
          }
        })
      })
      const insertOrderData = 'INSERT INTO `orderdata`(`memberId`, `vendorId`, `totalPrice`, `coupon`) VALUES (?, ?, ?, ?)'
      db.query(insertOrderData, [3, data.vendorId, totalPrice, data.couponId], (error, results, fields) => {
        // console.log(results)
        const insertOrderDetail = "INSERT INTO `orderdetail`(`orderId`, `productName`, `productPrice`, `productAmount`) VALUES (?, ?, ?, ?)"
        detailAry.forEach(item => {
          db.query(insertOrderDetail, [results.insertId, ...item], (error, results, fields) => {
            console.log(results)
          })
        })
      })

      // insert buy info
      // write
    })

    res.json('neworderdata')
  } catch (error) {
    console.log(error)
    throw error
  }

});



//廠商登入API
router.post('/try-logindata', (req, res) => {
  try {
    const data = { success: false, message: { type: 'danger', text: '' } };
    data.body = req.body;
    console.log('req.body', req.body)
    const sql = "SELECT id,vendorAccount,vendorPassword FROM vendordata WHERE vendorAccount=?";
    db.query(sql, req.body.vendorAccount, (error, results, fields) => {
      if (error) { throw error }
      if (results.length === 1) {
        console.log(results)
        if (req.body.vendorPassword === results[0].vendorPassword) {
          data.success = true;
          data.message.type = 'primary';
          data.message.text = '有相符資料'
          data.vendorid = results[0].id
          req.session.vendorOnlyId = data.vendorid
          console.log('登入設的session', req.session.vendorOnlyId)

        }
      } else {
        data.message.text = '無相符資料'
      }
      return res.json(data);
    });
  } catch (error) {
    throw error
  }

});

//取得廠商資料API
router.get('/getvendordata', vendorVerification, (req, res) => {
  const sql = "SELECT `vendorName`, `vendorEmail`, `vendorPhone`, `vendorZone`, `vendorAddress`, `vendorImg`,`vendorAbout` ,`vendorBanner` FROM `vendordata` WHERE id=?";
  let id = req.session.vendorOnlyId
  console.log('從session抓出來的', id)
  db.query(sql, id, (error, results, fields) => {
    if (error) throw error
    console.log('還沒改', results)
    results[0].vendorImg = "http://localhost:3333/images/" + results[0].vendorImg
    results[0].vendorBanner = "http://localhost:3333/images/" + results[0].vendorBanner
    console.log(results)
    res.json(results);

  });
  return
});





//更新廠商資料API




module.exports = router;
