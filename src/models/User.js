const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  isEmailConfirmed: {
    type: Boolean,
    default: false,
    enum : [false, true]
  }
}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);