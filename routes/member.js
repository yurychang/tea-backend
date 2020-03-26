const express = require('express');
const router = express.Router();
const db = require('../migrations/_connect_db_mamp')

//會員註冊
router.post('/signup', (req, res) => {
    try {
      const data = { success: false, message: { type: 'danger', text: '' } };
      data.body = req.body;
      console.log('req.body', req.body)
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

  //會員登入
  router.post('/login', (req, res) => {
    try {
      const data = { success: false, message: { type: 'danger', text: '' } };
      data.body = req.body;
      console.log('req.body', req.body)
      const sql = "SELECT id,m_username,m_passwd FROM memberdata WHERE id,m_username=?";
      db.query(sql, req.body.accountNumber, (error, results, fields) => {
        if (error) { throw error }
        console.log(results.length)
        if (results.length === 1) {
          console.log(results)
          if (req.body.accountPassword === results[0].accountPassword) {
            data.success = true;
            data.message.type = 'primary';
            data.message.text = '有相符資料'
            // data.vendorid = results[0].id
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

module.exports = router;
