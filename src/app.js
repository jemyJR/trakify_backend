const express = require("express");
const { loadEnv } = require("./shared/config/loadEnv");
const cors = require("cors");
const corsOptions = require("./shared/config/corsOrigins");
const apiRouter = require("./routes");
const simpleLoggerMiddleware = require("./shared/middleware/simpleLogger.middleware");
const swaggerDocs = require("./shared/swagger/swagger.docs");
const { NotFoundException } = require("./shared/exceptions/http.exceptions");
const {
  errorHandlerMiddleware,
} = require("./shared/middleware/errorHandler.middleware");
const app = express();

loadEnv();

app.use(cors(corsOptions));

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(simpleLoggerMiddleware);

swaggerDocs(app);

app.use("/api/v1", apiRouter);

app.use((req, res, next) => {
  next(
    new NotFoundException(`Route ${req.originalUrl} not found on this server`)
  );
});

app.use(errorHandlerMiddleware);

module.exports = { app };
