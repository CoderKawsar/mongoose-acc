const bcrypt = require("bcrypt");
const {
  signUpUserService,
  findUserByEmailService,
} = require("../services/user.service");
const { generateToken } = require("../utils/token");

module.exports.signup = async (req, res) => {
  try {
    const user = await signUpUserService(req.body);
    res.status(200).json({
      status: "Success",
      data: user,
      message: "Successfully signed up",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

/**
 * 1. Check if Email and password given
 * 2. Load user with email
 * 3. If not user, send res
 * 4. compare password
 * 5. if password not correct, send res
 * 6. check if user is active
 * 7. if not active, send res
 * 8. genereate token
 * 9. send user and token
 */
module.exports.login = async (req, res) => {
  try {
    // 1. Check if Email and password given
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "Please provide your credentials.",
      });
    }

    // 2. Load user with email
    const user = await findUserByEmailService(email);

    // 3. If not user, send res
    if (!user) {
      return res.status(401).json({
        status: "success",
        error: "Please, create an account first.",
      });
    }

    // 4. compare password
    const isPasswordValid = user.comparePassword(password, user.password);

    // 5. if password not correct, send res
    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        error: "Email/password is not correct.",
      });
    }

    // 6. check if user is active
    const isUserActive = user.status === "active";

    // 7. if not active, send res
    if (!isUserActive) {
      return res.status(401).json({
        status: "Fail",
        error: "Your account is not active yet!",
      });
    }

    // 8. genereate token
    const token = generateToken(user);

    // separating password and other informations
    const { password: pwd, ...others } = user.toObject();

    // 9. send user and token
    res.status(200).json({
      status: "Success",
      message: "Successfully logged in",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

module.exports.getMe = async (req, res) => {
  try {
    const user = await findUserByEmailService(req.user?.email);
    const { password, ...others } = user.toObject();
    res.status(400).json({
      status: "success",
      message: "User served",
      data: others,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};
