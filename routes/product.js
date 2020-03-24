const express = require("express");
const router = express.Router();
const db = require("../migrations/_connect_db");

// get Events
router.get("/try-get", (req, res) => {
  const data = { success: false, message: { type: "danger", text: "" } };
  data.body = req.body;
  console.log("req.body", req.body);
  const sql =
    " SELECT `id`, `title`, `tag`, `classIfy`, `price`, `unit`, `sTime`, `idVendor`, `feaTure`, `img`, `created_at`, `updated_at` FROM `commodity` WHERE 1 ";
  db.query(sql, (error, results, fields) => {
    if (error) {
      throw error;
    }

    return res.json(results);
  });
});
//獲取單一資料
router.get("/get-single-product/:id", (req, res) => {
  const data = { success: false, message: { type: "danger", text: "" } };
  const sql =
    "SELECT `title`, `tag`, `classIfy`, `price`, `unit`, `sTime`, `idVendor`, `feaTure`, `img` FROM `commodity` WHERE `id`=?";
  db.query(sql, req.params.id, (error, results, fields) => {
    if (error) {
      throw error;
    }
    return res.json(results);
  });
});

module.exports = router;
