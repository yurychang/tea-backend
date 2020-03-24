const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({
  dest: 'public/event/tmp',
  fileFilter: (req, file, cb) => {
    switch (file.mimetype) {
      case 'image/jpeg':
        file.ext = 'jpg'
        cb(null, true)
        break;
      case 'image/png':
        file.ext = 'png'
        cb(null, true)
        break;
      case 'image/gif':
        file.ext = 'gif'
        cb(null, true)
        break;
      case 'image/svg+xml':
        file.ext = 'svg'
        cb(null, true)
        break;
      default:
        cb(new Error(''))
        break;
    }
  }
}).single('upload')

/* GET home page. */
router.post('/event/tmp', upload, function (req, res, next) {
  res.send('upload/tmp');
  console.log(req.file)
});

module.exports = router;
