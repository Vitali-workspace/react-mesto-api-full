const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { tokenSecret = 'dev-secret-key' } = process.env;


module.exports = (req, res, next) => {
  const cookieWithToken = req.cookies.jwt;

  if (!cookieWithToken) {
    return next(new UnauthorizedError('авторизация не пройдена'));
  }
  let payload;

  try {
    payload = jwt.verify(cookieWithToken, tokenSecret);
  } catch {
    return next(new UnauthorizedError('авторизация не пройдена'));
  }

  req.user = payload;
  return next();
};
