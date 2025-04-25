const express = require("express");
const router = express.Router();
const userRouter = require("./modules/users/users.routes");
const authRouter = require("./modules/auth/auth.routes");

router.use("/users", userRouter);
router.use("/auth", authRouter);

module.exports = router;
