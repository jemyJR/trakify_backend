const {
  NotFoundException,
} = require("../../shared/exceptions/http.exceptions");
const User = require("./user.model");
const logger = require("../../shared/utils/logger");
const { removeSensitiveInfo } = require("./user.utils");

exports.getUserById = async function (userId) {
  logger.debug(`Fetching user with ID: ${userId}`);

  const user = await User.findById(userId).populate("image");
  if (!user) {
    throw new NotFoundException(`User with id ${userId} not found`);
  }
  logger.info(`User with ID: ${userId} found`);
  return removeSensitiveInfo(user);
};

exports.updateUser = async function (userId, userData, uploadedImage) {
  logger.debug(`Updating user with ID: ${userId}`);

  const { name, email } = userData;
  const updateFields = {};

  if (name) updateFields.name = name;
  if (email) updateFields.email = email;

  if (uploadedImage) {
    const user = await User.findById(userId);
    if (user?.image) {
      await deletePreviousFile(user.image);
    }

    updateFields.image = uploadedImage._id;
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updateFields },
    { new: true, runValidators: true }
  ).populate("image");

  logger.info(`User updated successfully`);
  return removeSensitiveInfo(updatedUser);
};
