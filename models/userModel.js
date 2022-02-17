const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      min: [3, "name has to be minimum 3 characters"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      min: [6, "password has to be minimum 6 characters"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
