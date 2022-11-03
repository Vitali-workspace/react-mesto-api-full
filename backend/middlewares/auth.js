const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;


module.exports = (req, res, next) => {
  const devTokenSecret = 'dev-secret-key';

  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('авторизация не пройдена'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devTokenSecret);
  } catch {
    return next(new UnauthorizedError('авторизация не пройдена'));
  }

  req.user = payload;
  return next();
};
