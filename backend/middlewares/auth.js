const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;


module.exports = (req, res, next) => {
  const cookieWithToken = req.cookies.jwt;
  const devTokenSecret = 'dev-secret-key';

  if (!cookieWithToken) {
    return next(new UnauthorizedError('авторизация не пройдена'));
  }
  let payload;

  try {
    payload = jwt.verify(cookieWithToken, NODE_ENV === 'production' ? JWT_SECRET : devTokenSecret);
  } catch {
    return next(new UnauthorizedError('авторизация не пройдена'));
  }

  req.user = payload;
  return next();
};
