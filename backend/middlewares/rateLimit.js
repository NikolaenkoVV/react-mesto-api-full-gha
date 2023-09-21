const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 10000,
	message: 'Количество запросов на сервер превышено'
});

module.exports = limiter;