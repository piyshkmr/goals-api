const router = require("express").Router();
const {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalsControllers");

const auth = require("../middlewares/authMiddleware");
const goalAuth = require("../middlewares/goalMiddleware");

router.use(auth);

// get goals and add goal
router.route("/").get(getGoals).post(addGoal);

// update and delete goal
router.route("/:id").patch(goalAuth, updateGoal).delete(goalAuth, deleteGoal);

module.exports = router;
