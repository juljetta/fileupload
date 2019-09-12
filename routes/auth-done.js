const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 1; // cost factor for producing the hash

// With "salt round" they actually mean the cost factor. The cost factor controls how much time is needed to calculate a single BCrypt hash. The higher the cost factor, the more hashing rounds are done. Increasing the cost factor by 1 doubles the necessary time. The more time is necessary, the more difficult is brute-forcing.
// The salt is a random value, and should differ for each calculation, so the result should hardly ever be the same, even for equal passwords.
// The salt is usually included in the resulting hash-string in readable form. So with storing the hash-string you also store the salt. Have a look at this answer for more details.

// "/users/new"
router.post("/register", (req, res) => {
  const { name, age, mood, password } = req.body;

  bcrypt
    .hash(password, saltRounds)
    .then(hashedPassword => {
      return User.create({
        name,
        age,
        mood,
        password: hashedPassword
      });
    })
    .then(userCreated => {
      res.redirect("/users");
    })
    .catch(err => {
      res.send("error");
    });
});

router.post("/login", (req, res, next) => {
  const { name, password } = req.body;

  const getUser = async () => {
    debugger;
    try {
      const user = await User.findOne({ name });
      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          const session = req.session;
          session.user = user;

          debugger;
          res.send("Login success");
        } else {
          res.send("Incorrect password");
        }
      }
    } catch (err) {
      next(new Error(err));
    }
  };

  getUser();
});

module.exports = router;
