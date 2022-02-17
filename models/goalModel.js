const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: [true, "Text field is required"],
      max: [500, "Goal can't be longer than 500 characters"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
