const {
  NotFoundException,
  BadRequestException,
  ConflictException,
} = require("../../shared/exceptions/http.exceptions");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("./auth.utils");

const User = require("../users/user.model");
const logger = require("../../shared/utils/logger");
const { removeSensitiveInfo } = require("../users/user.utils");

exports.registerUser = async function (userData) {
  logger.debug("Creating a new user in the database");

  const { password, ...rest } = userData;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    password: hashedPassword,
    ...rest,
  });
  await newUser.save();
  logger.info("User created successfully");

  return removeSensitiveInfo(newUser);
};

exports.loginUser = async function (email, password) {
  logger.debug(`Logging in user with email: ${email}`);
  const user = await User.findOne({ email }).populate("image");
  if (!user) {
    throw new NotFoundException("Invalid email or password");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new BadRequestException("Invalid email or password");
  }

  logger.info(`User with email ${email} logged in successfully`);
  const accessToken = generateAccessToken(user);
  return {
    user: removeSensitiveInfo(user),
    accessToken,
  };
};

exports.changePassword = async function (userId, oldPassword, newPassword) {
  logger.debug(`Changing password for user with ID: ${userId}`);
  const user = await User.findById(userId).select("+password");
  if (!user) {
    throw new NotFoundException("User not found");
  }
  if (!user.password)
    throw new ConflictException(
      "User doesn't have a password. Use set password instead."
    );

  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatch) {
    throw new BadRequestException("Old password is incorrect");
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashedPassword;
  await user.save();
  logger.info(`Password changed successfully for user with ID: ${userId}`);
  return "Password changed successfully";
};
