const mongoose = require("mongoose");
const logger = require("../../utils/logger");

const dbConnect = async (MONGO_URL) => {
  try {
    await mongoose.connect(MONGO_URL);
  } catch (error) {
    logger.error("Database connection error:", error);
  }
};

module.exports = { dbConnect };
