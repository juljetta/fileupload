const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: __dirname + "/../public/images/album/" });
const Photo = require("../models/Photo");
const User = require("../models/User");

// 1. make multer store
router.post("/upload", upload.single("photo"), (req, res, next) => {
  Photo.create({
    name: req.file.filename, //name made by multer
    path: req.file.path, //also name by multer
    originalName: req.body.originalName, // name made by user
    author: req.session.user._id //session_user_id
  })
    .then(photoCreated => {
      //here we will update user
      return User.findByIdAndUpdate(req.session.user._id, {
        $push: { photos: photoCreated._id }
      });
    })
    .then(updatedUser => {
      res.redirect("/profile");
    })
    .catch(err => {
      next(err);
    });
});

router.get("/all", (req, res, next) => {
  Photo.find()
    .populate("authour")
    .then(photos => {
      res.render("photos", { photos: photos });
    });
});
// 2. create photoModel
//- req.file will give info about photo
//- req.session we find wich user upload photo.
// 3. insert photo in db
// 4. update UserModel

module.exports = router;
