const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const { NODE_ENV, SECRET_JWT } = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_JWT : 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;

  return next();
};

module.exports = auth;
