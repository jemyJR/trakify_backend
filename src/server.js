const { app } = require("./app");

const { dbConnect } = require("./shared/config/dbConnect");
const mongoose = require("mongoose");
const logger = require("./utils/logger");

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;
const MONGO_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?${process.env.DB_OPTIONS}`;
dbConnect(MONGO_URL);

mongoose.connection.once("open", () => {
  logger.info("Connected to the database");
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (error) => {
  logger.error("Database connection error:", error);
});
