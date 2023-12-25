const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is requried"],
  },
  email: {
    type: String,
    required: [true, "email is requried"],
  },
  password: {
    type: String,
    required: [true, "password is requried"],
  },
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
