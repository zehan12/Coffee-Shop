const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// User Database Schema
const userSchema = new mongoose.Schema({
  phone: {
    type: Number,
    require: true,
    minLength: 10,
    maxLength: 15,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
    },
  ],
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("user", userSchema);

module.exports = User;
