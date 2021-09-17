const jwt = require('jsonwebtoken');
const User = require('../models/user');
const IncorrectUserCredErr = require('../errors/IncorrectUserCredErr');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
        expiresIn: '7d',
      });

      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      next(new IncorrectUserCredErr());
    });
};
