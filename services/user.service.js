const User = require("../models/User");

module.exports.getUsers = async () => {
  const user = await User.find({});

  return { user };
};

module.exports.signUpUserService = async (userInfo) => {
  const user = await User.create(userInfo);
  return { user };
};

module.exports.findUserByEmailService = async (email) => {
  const user = await User.findOne({ email });
  return user;
};
