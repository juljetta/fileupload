const express = require("express");
const router = express.Router();

router.use("/", (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.send("You are not logged in");
  }
});

module.exports = router;
