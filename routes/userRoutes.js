const router = require("express").Router();

const { userInfo, register, login } = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");

router.get("/me", auth, userInfo);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
