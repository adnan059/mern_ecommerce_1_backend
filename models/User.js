const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "A valid email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password should be at least 6 characters long."],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator, {
  message:
    "Another user with the same {PATH} already exists. Please try with another one.",
});

const User = mongoose.model("User", userSchema);

module.exports = User;
