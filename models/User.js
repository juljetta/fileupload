const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  age: Number,
  mood: String,
  password: { type: String, required: true },
  //user can have many posts (one to manys)
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  profileImg: String,
  photos: [{ type: Schema.Types.ObjectId, ref: "Photo" }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
