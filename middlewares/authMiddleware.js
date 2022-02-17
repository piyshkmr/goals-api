const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const auth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decoded.id };
      return next();
    } catch (err) {
      res.status(403);
      throw new Error("Invalid token");
    }
  }

  res.status(403);
  throw new Error("Token is required for authentication");
});

module.exports = auth;
