const express = require("express");
const router = express.Router();
const authenticateRouter = require("../routes/authorisation");

router.get("/", (req, res) => {
  res.render("profile", { user: req.session.currentUser });
});

router.post("/update", (req, res) => {});
module.exports = router;
