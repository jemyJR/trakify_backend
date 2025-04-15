const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});

// Add more routes here, e.g.:
// router.use("/users", userRouter);

module.exports = router;
