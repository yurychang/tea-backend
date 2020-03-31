const express = require('express');
const router = express.Router();
const db = require('../migrations/_connect_db')
const memberVerification = require('../middlewar/memberVerification')
const multer = require('multer');
const upload = multer({ dest: 'tmp_uploads' });
const fs = require('fs');

//會員註冊
router.post('/signup', (req, res) => {
  try {
    const data = { success: false, message: { type: 'danger', text: '' } };
    data.body = req.body;
    const sql = "INSERT INTO memberdata(m_username,m_passwd,m_email,m_phone) VALUE(?,?,?,?) ";
    db.query(sql, [req.body.accountNumber, req.body.accountPassword, req.body.accountEmail, req.body.accountPhone], (error, results, fields) => {
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

// 會員登出
router.get('/logout', function (req, res) {
  delete req.session.memberId
  res.send('logout')
})

//會員登入
router.post('/login', (req, res) => {
  try {
    const data = { success: false, message: { type: 'danger', text: '' } };
    data.body = req.body;
    const sql = "SELECT `m_id`,`m_username`,`m_passwd` FROM `memberdata` WHERE m_username = ?";
    db.query(sql, req.body.accountNumber, (error, results, fields) => {
      if (error) { throw error }
      if (results.length === 1) {
        if (req.body.accountPassword === results[0].m_passwd) {
          data.success = true;
          data.message.type = 'primary';
          data.message.text = '有相符資料'
          data.m_id = results[0].m_id
          req.session.memberId = data.m_id
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

//取得會員資料API
router.get('/getmemberdata/:id', memberVerification, (req, res) => {
  const sql = "SELECT `m_username`, `m_email`, `m_phone`,`m_address`, `m_img` FROM `memberdata` WHERE m_id = ?";
  let m_id = req.params.id
  db.query(sql, m_id, (error, results, fields) => {
    if (error) throw error
    console.log('還沒改', results)
    results[0].m_img = "http://localhost:3333/images/" + results[0].m_img
    console.log(results)
    res.json(results);
  });
});


//會員更新
router.post('/updatedata', upload.single('memberImg'), (req, res) => {
  let memberObj = {
    m_username: req.body.memberName,
    m_email: req.body.memberEmail,
    m_phone: req.body.memberPhone,
    m_address: req.body.memberAddress,
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
      req.file.path = req.file.originalname
      memberObj['m_img'] = req.file.path
    } else {
      data.success = true;
      data.message.imgmsg = '';
    }
    const sql = "UPDATE memberdata SET ?  WHERE m_id=?";
    db.query(sql, [memberObj, req.body.localId], (error, results, fields) => {
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
    console.log(error)
    throw error
  }

});
module.exports = router;
