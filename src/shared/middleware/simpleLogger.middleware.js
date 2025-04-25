const logger = require("../utils/logger");

const simpleLoggerMiddleware = (req, res, next) => {
  const start = Date.now();
  const { method, originalUrl } = req;
  console.log(req.body);

  logger.info(`→ ${method} ${originalUrl}`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(`← ${method} ${originalUrl} ${res.statusCode} - ${duration}ms`);
  });

  next();
};

module.exports = simpleLoggerMiddleware;
