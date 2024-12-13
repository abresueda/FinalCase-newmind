const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),

    // Sadece "error" seviyesindeki logları error.log dosyasına yazdırır
    new winston.transports.File({
      filename: "error.log",
      level: "error",
    }),

    // Tüm seviyelerdeki logları combined.log dosyasına yazdırır
    new winston.transports.File({
      filename: "combined.log",
    }),
  ],
});

module.exports = logger;
