const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 50000,
  max: 10000,
  message: "Количество запросов на сервер превышено",
});

module.exports = limiter;
