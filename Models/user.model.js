const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  room: String,
  SocketId: String,
});

const userModel = mongoose.model("userModel", userSchema);

module.exports = { userModel };