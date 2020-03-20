const express = require('express');
const router = express.Router();
const db = require('../migrations/_connect_db')
const multer = require('multer');
const upload = multer({ dest: 'tmp_uploads' });
const fs = require('fs');


router.get('/try-get', (req, res) => {
  const sql = "SELECT `id`, `vendorAccount`, `vendorPassword`, `vendorName`, `vendorEmail`, `vendorPhone`, `vendorZone`, `vendorAddress`, `vendorImg`, `vendorAbout`, `vendorBanner`, `createdAt`, `updatedAt` FROM `vendordata` WHERE 1";

  db.query(sql, (error, results, fields) => {
    if (error) throw error
    res.json(results);

  });
  return
});

// get Events
//廠商註冊API
router.post('/vendorsignup', (req, res) => {
  try {
    const data = { success: false, message: { type: 'danger', text: '' } };
    data.body = req.body;
    console.log('req.body', req.body)
    const sql = "INSERT INTO vendordata(vendorAccount,vendorPassword,vendorEmail,vendorPhone) VALUE(?,?,?,?) ";
    db.query(sql, [req.body.vendorAccount, req.body.vendorPassword, req.body.vendorEmail, req.body.vendorPhone], (error, results, fields) => {
      if (error) { throw error }
      if (results.affectedRows === 1) {
        data.success = true;
        data.message.type = 'primary';
        data.message.text = '新增完成'
      } else {
        data.message.text = '資料沒有新增'
      }
      return res.json(data);
    });
  } catch (error) {
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
      console.log(results.length)
      if (results.length === 1) {
        console.log(results)
        if (req.body.vendorPassword === results[0].vendorPassword) {
          data.success = true;
          data.message.type = 'primary';
          data.message.text = '有相符資料'
          data.vendorid = results[0].id
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

//更新廠商資料API
var dbUpload = upload.fields([{ name: 'vendorImg', maxCount: 1 }, { name: 'vendorBanner', maxCount: 1 }])
router.post('/updatedata', dbUpload, (req, res) => {
  try {
    const data = { success: false, message: { type: 'danger', text: '', url: '' } };

    console.log(req.dbUplode.length)


    data.body = req.body;
    console.log('req.body', req.body)
    vendorName, vendorEmail, vendorPhone, vendorZone, vendorAddress
    const sql = "UPDATE vendordata SET vendorName=?,vendorEmail=?,vendorPhone=?,vendorZone=?,vendorAddress=?,vendorImg, vendorAbout, vendorBanner WHERE id=?";
    db.query(sql, [req.body.vendorName, req.body.vendorEmail, req.body.vendorPhone, req.body.vendorZone, req.body.vendorAddress, req.body.vendorImg, req.body.vendorImg, req.body.vendorbout, req.body.vendorBanner, req.body.vendorId], (error, results, fields) => {
      if (error) { throw error }
      console.log(results.length)
      if (results.length === 1) {
        console.log(results)
        data.success = true;
        data.message.type = 'primary';
        data.message.text = '更新成功'
      } else {
        data.message.text = '無更新'
      }
      return res.json(data);
    });
  } catch (error) {
    throw error
  }

});

module.exports = router;
