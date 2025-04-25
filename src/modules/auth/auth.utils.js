const jwt = require("jsonwebtoken");
const logger = require("../../shared/utils/logger");

exports.generateAccessToken = function (user) {
  logger.debug("Generating access token for user", user._id);
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};
