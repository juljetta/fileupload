const express = require("express");
const router = express.Router();
const User = require("../models/User");
const multer = require("multer");
var upload = multer({ dest: __dirname + "/../public/images/profile" });

router.get("/", (req, res) => {
  User.findById(req.session.user._id)
    .populate("posts") // here mongoose also queries the posts collection
    .then(user => {
      debugger;
      res.render("profile", { user: user });
    });
  //mongoose looks for user with id of session.user._id
  //populate is gonna look for all the posts that match id with whatever is in posts array
});

router.post("/edit/img", upload.single("profile"), async (req, res) => {
  debugger;

  await User.findByIdAndUpdate(req.session.user._id, {
    $set: { profileImg: req.file.filename }
  });

  res.redirect("/profile");
});

module.exports = router;
