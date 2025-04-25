const UserService = require("./users.service");

exports.getUserProfile = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await UserService.getUserById(userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const uploadedImage = req.uploadedFiles.image?.[0] || null;
    const updatedUser = await UserService.updateUser(
      userId,
      userData,
      uploadedImage
    );
    res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
