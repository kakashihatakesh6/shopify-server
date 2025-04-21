const winston = require("winston");

const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
  level: "info",  // Adjust log level to your needs
  format: winston.format.combine(
    winston.format.timestamp(),
    logFormat
  ),
  transports: [
    // Console log transport
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    // File log transport (logs saved to ./logs/combined.log)
    new winston.transports.File({ filename: "logs/combined.log" }),
    // File log transport for error logs (logs saved to ./logs/error.log)
    new winston.transports.File({ filename: "logs/error.log", level: "error" })
  ]
});

module.exports = logger;
