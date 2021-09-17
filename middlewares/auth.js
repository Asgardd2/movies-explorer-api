const jwt = require('jsonwebtoken');
const UserUnAuthorizatedErr = require('../errors/UserUnAuthorizatedErr');

const extractBearerToken = (header) => header.replace('Bearer ', '');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new Error('Необходима авторизация'));
  } else {
    const token = extractBearerToken(authorization);

    let payload;

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } catch (err) {
      next(new UserUnAuthorizatedErr());
    }

    req.user = payload; // записываем пейлоуд в объект запроса'

    next(); // пропускаем запрос дальше
  }
};
