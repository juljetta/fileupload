var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  debugger;
  res.render("index.hbs");
});

router.get("/anotherIndex", function(req, res, next) {
  res.render("index", { title: "This another route" });
});

module.exports = router;
