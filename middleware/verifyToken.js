const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/User");

/**
 * 1. check if token exists
 * 2. if token not found, send res
 * 3. decode the token
 * 4. if token is valid, next
 */

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];

    if (!token) {
      return res.status(401).json({
        status: "fail",
        error: "You are not logged in, login first.",
      });
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_TOKEN_SECRET
    );

    req.user = decoded;

    // const user = await User.findOne({ email: decoded.email });

    next();
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      error: error.message,
    });
  }
};
