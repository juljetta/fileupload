const express = require("express");
const router = express.Router();
const User = require("../models/User");

// "/users/new"
router.post("/register", (req, res) => {
  User.create(req.body)
    .then(() => {
      res.redirect("/users");
    })
    .catch(err => {
      res.send("error");
    });
});

router.get("/login", (req, res) => {});

module.exports = router;
