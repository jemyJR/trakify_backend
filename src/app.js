const express = require("express");
const { loadEnv } = require("./shared/config/loadEnv");
const cors = require("cors");
const corsOptions = require("./shared/config/corsOrigins");
const apiRouter = require("./routes");

const app = express();

loadEnv();

app.use(cors(corsOptions));

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", apiRouter);

// app.all("*", (req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

module.exports = { app };
