const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

/**
 *
 * @desc register user
 * @route POST api/user/register
 * @access public
 *
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //   if one of these field is empty
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All field are required");
  }

  //   hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);

  //   creating user
  const user = await User.create({ name, email, password: hashedPassword });

  return res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

/**
 *
 * @desc login user
 * @route POST api/user/login
 * @access public
 *
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //   if one of these field is empty
  if (!email || !password) {
    res.status(400);
    throw new Error("All field are required");
  }

  //   finding user
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error("Invalid Credentials");
  }

  return res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

/**
 *
 * @desc get user info
 * @route GET api/user/me
 * @access private
 *
 */
const userInfo = asyncHandler(async (req, res) => {
  // getting user
  const user = await User.findById(req.user.id, {
    password: 0,
    createdAt: 0,
    updatedAt: 0,
  });

  if (!user) {
    res.status(400);
    throw new Error("No data found for user");
  }
  return res.json(user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

module.exports = {
  userInfo,
  login,
  register,
};
