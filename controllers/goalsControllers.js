const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");

/**
 *
 * @desc get all goals
 * @route GET api/goals
 * @access private
 *
 */
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ userId: req.user.id });
  res.status(200).json(goals);
});

/**
 *
 * @desc add goal
 * @route POST api/goals
 * @access private
 *
 */
const addGoal = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error("Text field is required");
  }

  const goal = await Goal.create({
    text,
    userId: req.user.id,
  });

  return res.status(201).json(goal);
});

/**
 *
 * @desc update goal
 * @route PATCH api/goal/:id
 * @access private
 *
 */
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(goal);
});

/**
 *
 * @desc delete goal
 * @route DELETE api/goal/:id
 * @access private
 *
 */
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findByIdAndDelete(req.params.id, { _id: 1 });
  res.status(200).json(goal);
});

module.exports = {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
};
