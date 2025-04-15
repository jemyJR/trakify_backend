const winston = require("winston");
require("winston-mongodb");

const { combine, timestamp, printf, errors, colorize } = winston.format;

const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} - ${level}: ${stack || message}`;
});

const transports = [];

transports.push(
  new winston.transports.Console({
    format: combine(
      colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      customFormat
    ),
  })
);

transports.push(
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
    format: combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      customFormat
    ),
  }),
  new winston.transports.File({
    filename: "logs/combined.log",
    format: combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      customFormat
    ),
  })
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  transports,
  exitOnError: false,
});

const MONGO_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?${process.env.DB_OPTIONS}`;

logger.add(
  new winston.transports.MongoDB({
    db: MONGO_URL,
    collection: "app_logs",
    level: "warn",
    format: combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      customFormat
    ),
  })
);

module.exports = logger;
