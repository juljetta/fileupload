const mongoose = require("mongoose");
const User = require("../models/User");
const data = require("./data");

mongoose
  .connect("mongodb://localhost:27017/mytestapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(connection => {
    console.log("successfully connected");
    return User.deleteMany();
  })
  .then(() => {
    return User.insertMany(data);
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });
