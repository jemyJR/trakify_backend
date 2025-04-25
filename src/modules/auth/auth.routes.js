const express = require("express");
const authController = require("./auth.controller");
const {
  registerValidator,
  loginValidator,
  changePasswordValidator,
} = require("./auth.validators");

const { authMiddleware } = require("../../shared/middleware/auth.middleware");

const authRouter = express.Router();

authRouter.post("/register", registerValidator, authController.registerUser);

authRouter.post("/login", loginValidator, authController.loginUser);

authRouter.use(authMiddleware);

authRouter.post(
  "/change-password",
  changePasswordValidator,
  authController.changePassword
);

module.exports = authRouter;
