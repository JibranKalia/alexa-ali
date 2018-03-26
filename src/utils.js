const winston = require("winston");

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true
    })
  ]
});

module.exports = logger;
