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

//取得廠商資料API
router.get('/getvendordata/:id', (req, res) => {
  const sql = "SELECT `vendorName`, `vendorEmail`, `vendorPhone`, `vendorZone`, `vendorAddress`, `vendorImg` FROM `vendordata` WHERE id=?";
  let id = req.params.id
  console.log(id)
  db.query(sql, id, (error, results, fields) => {
    if (error) throw error
    res.json(results);

  });
  return
});





//更新廠商資料API
// var dataUpload = upload.fields([{ name: 'vendorName' }, { name: 'vendorEmail'}, { name: 'vendorPhone'}, { name: 'vendorZone'},{name:'vendorAddress'},{name:'vendorImg'}])
router.post('/updatedata', upload.single('vendorImg'), (req, res) => {
  let venderObj = {
    vendorName: req.body.vendorName,
    vendorEmail: req.body.vendorEmail,
    vendorPhone: req.body.vendorPhone,
    vendorZone: req.body.vendorZone,
    vendorAddress: req.body.vendorAddress,
  }
  try {
    const data = { success: false, message: { type: 'danger', text: '', url: '', imgmsg: '' } };
    if (req.file) {
      switch (req.file.mimetype) {
        case 'image/jpeg':
        case 'image/png':
        case 'image/gif':
        case undefined:
          fs.rename(req.file.path, './public/images/' + req.file.originalname, error => {
            if (error) {
              data.success = false;
              data.message.imgmsg = '無法搬動檔案';
            } else {
              data.success = true;
              data.message.imgmsg = '';

            }
          });
          break;
        default:
          fs.unlink(req.file.path, error => {
            data.message.imgmsg = '不接受式這種檔案格';
          });
      }
      req.file.path = './public/images/' + req.file.originalname
      venderObj['vendorImg'] = req.file.path
    } else {
      data.success = true;
      data.message.imgmsg = '';
    }
    const sql = "UPDATE vendordata SET ?  WHERE id=?";
    db.query(sql, [venderObj, req.body.localId], (error, results, fields) => {
      if (error) { throw error }
      if (results.length === 1) {
        // console.log('results',results)
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



//更新關於我跟Banner

router.post('/updateabout', upload.single('vendorBanner'), (req, res) => {
  try {
    const data = { success: false, message: { type: 'danger', text: '', url: '', imgmsg: '' } };
    // console.log(dbUpload.name)
    // console.log('req.body', req.body)
    // console.log('req.file', req.file)
    // console.log('req.files', req.files)
    const sql = "UPDATE vendordata SET  vendorAbout=?, vendorBanner=? WHERE id=?";
    return;
    db.query(sql, [req.body.vendorName, req.body.vendorEmail, req.body.vendorPhone, req.body.vendorZone, req.body.vendorAddress, req.body.vendorImg, req.body.vendorImg, req.body.vendorbout, req.body.vendorBanner, req.body.vendorId], (error, results, fields) => {
      if (error) { throw error }
      console.log()
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
