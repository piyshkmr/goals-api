const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

const goalHandler = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const goal = await Goal.findOne({ _id: id, userId: req.user.id });

  if (goal) {
    return next();
  }

  res.status(404);
  throw new Error("Goal not found");
});

module.exports = goalHandler;
