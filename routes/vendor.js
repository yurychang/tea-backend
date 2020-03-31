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

//後端預覽廠商前台API
router.get('/previewvendor/:id', (req, res) => {
  const sql = "SELECT `vendorName`, `vendorPhone`, `vendorZone`, `vendorImg`, `vendorAbout`, `vendorBanner` FROM `vendordata` WHERE id=?";
  db.query(sql, req.params.id, (error, results, fields) => {
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
router.post('/vendorsignup', (req, res) => {
  try {
    const data = { success: false, message: { type: 'danger', text: '' } };
    data.body = req.body;
    console.log('req.body', req.body)//傳過來的資料
    const sql = "INSERT INTO vendordata(vendorAccount,vendorPassword,vendorEmail,vendorPhone) VALUE(?,?,?,?) ";
    db.query(sql, [req.body.vendorAccount, req.body.vendorPassword, req.body.vendorEmail, req.body.vendorPhone], (error, results, fields) => {
      if (error) { throw error }
      console.log('signupresults',results)
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

router.post('/updatedata',vendorVerification ,upload.single('vendorImg'), (req, res) => {
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
      req.file.path = req.file.originalname
      venderObj['vendorImg'] = req.file.path
    } else {
      data.success = true;
      data.message.imgmsg = '';
    }
    let id = req.session.vendorOnlyId
    const sql = "UPDATE vendordata SET ?  WHERE id=?";
    db.query(sql, [venderObj, id], (error, results, fields) => {
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
  let venderObj = {
    vendorAbout: req.body.vendorAbout,
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
      venderObj['vendorBanner'] = req.file.path
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
//更新關於我跟Banner區結束


//取得廠商訂單API(列表)
router.get('/getvendorderlist',vendorVerification, (req, res) => {
  const sql = "SELECT `id`,`memberId`, `vendorId`, `totalPrice`,`orderId` FROM `orderdata` WHERE vendorId=?";
  let id = req.session.vendorOnlyId
  console.log(id)
  db.query(sql, id, (error, results, fields) => {
    if (error) throw error
    console.log(results)
    res.json(results);

  });
  return
});




//取得廠商訂單API(單筆詳細)
router.get('/getvendororder/:orderid', (req, res) => {
  const sql = "SELECT orderdata.id , orderdata.memberId ,orderdetail.productName ,orderdetail.productPrice ,orderdetail.productAmount FROM orderdata INNER JOIN orderdetail ON orderdata.id=orderdetail.orderId WHERE id=?";
  let orderid = req.params.orderid
  console.log('orderid', orderid)
  db.query(sql, orderid, (error, results, fields) => {
    if (error) throw error
    console.log(results)
    res.json(results);

  });
  return
});

//取得廠商商品API(列表)
router.get('/getvendorproductlist',vendorVerification, (req, res) => {
  const sql = "SELECT `id`, `title`, `tag`, `classIfy`, `price`, `unit`, `sTime`, `idVendor`, `feaTure`, `img` FROM `commodity` WHERE `idVendor`=?";
  let id = req.session.vendorOnlyId
  console.log(id)
  db.query(sql, id, (error, results, fields) => {
    if (error) throw error
    console.log(results)
    res.json(results);

  });
  return
});


//廠商登出
router.get('/logout', function (req, res) {
  delete req.session.memberId
  res.send('logout')
})

// 廠商發送訊息
router.post('/BackendAddMsg',(req, res) => {
  try {
    const data = { success: false, message: { type: 'danger', text: '' } };
    data.body = req.body;
    console.log('req.body', req.body)
    
    let id=req.session.venderOnlyId
    const sql = "INSERT INTO noticelist (vendorId,title,content,status) VALUE(?,?,?,?)";
    db.query(sql, [ req.body.vendorId, req.body.title, req.body.content, req.body.status ], (error, results, fields) => {
      if (error) { throw error }
      if (results.affectedRows === 1) {
        data.success = true;
        data.message.type = 'primary';
        data.message.text = '新增完成'
      } else {
        data.message.text = '訊息新增失敗'
      }
      return res.json(data);
    });
  } catch (error) {
    throw error
  }

});

// 廠商取得訊息
router.get('/getMsg', vendorVerification, (req, res) => {
  const sql = "SELECT `title`, `content`,`id` FROM `noticelist` WHERE `vendorId`=?";
  let id = req.session.vendorOnlyId
  console.log( id)
  db.query(sql, id, (error, results, fields) => {
    if (error) throw error
    console.log(results)
    res.json(results);

  });
  return
});

// 廠商訊息推播狀態更新
router.put('/updateMsg',upload.none() , vendorVerification , (req, res) => {
  try {
    const data = { success: false, message: { type: 'danger', text: '' } };
    data.body = req.body;
    console.log('req.body', req.body)
    
    let id=req.session.venderOnlyId
    const sql = "UPDATE noticeList SET `status` = ?  WHERE `id` = ? ";
    db.query(sql, [ req.body.status,req.body.id ], (error, results) => {
      if (error) { throw error }
      if (results.length === 1) {
        data.success = true;
        data.message.type = 'primary';
        data.message.text = '狀態更新'
      } else {
        data.message.text = '狀態更新失敗'
      }
      return res.json(data);
    });
  } catch (error) {
    throw error
  }

});

module.exports = router;
