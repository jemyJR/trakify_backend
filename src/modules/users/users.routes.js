const express = require("express");
const UserController = require("./users.controller");
const { updateUserValidator } = require("./user.validators");
const { authMiddleware } = require("../../shared/middleware/auth.middleware");
const uploadFileMiddleware = require("../../shared/middleware/uploadFile.middleware");

const userRouter = express.Router();

userRouter.use(authMiddleware);

userRouter.get("/:id", UserController.getUserProfile);

userRouter.patch(
  "/:id",
  uploadFileMiddleware("image", "trakify/users/images"),
  updateUserValidator,
  UserController.updateUser
);

module.exports = userRouter;
