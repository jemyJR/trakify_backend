const { app } = require("./app");

const { dbConnect } = require("./shared/config/dbConnect");
const mongoose = require("mongoose");

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;
const MONGO_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?${process.env.DB_OPTIONS}`;
dbConnect(MONGO_URL);

mongoose.connection.once("open", () => {
  console.log("Connected to the database");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}/api/v1`);
  });
});

mongoose.connection.on("error", (error) => {
  console.error("Error connecting to the database: ", error);
});
