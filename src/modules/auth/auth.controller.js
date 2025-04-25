const authService = require("./auth.service");

exports.registerUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const newUser = await authService.registerUser(userData);
    res.status(201).json({
      message: `User created successfully`,
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loginData = await authService.loginUser(email, password);

    res.json({
      message: "User logged in successfully",
      ...loginData,
    });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async function (req, res, next) {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;
    const message = await authService.changePassword(
      userId,
      oldPassword,
      newPassword
    );
    res.json({
      message,
    });
  } catch (err) {
    next(err);
  }
};
