const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pictureSchema = new Schema(
  {
    name: String,
    path: String,
    originalName: String,
    authour: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const Photo = mongoose.model("Photo", pictureSchema);

module.exports = Photo;
