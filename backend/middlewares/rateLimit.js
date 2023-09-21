const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 10000,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
	message: 'Количество запросов на сервер превышено'
});

module.exports = limiter;