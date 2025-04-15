const mongoose = require("mongoose");

const dbConnect = async (MONGO_URL) => {
  try {
    await mongoose.connect(MONGO_URL);
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

module.exports = { dbConnect };
