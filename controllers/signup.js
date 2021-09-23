const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UnknownErr = require('../errors/UnknownErr');
const UserIsAlreadtExistsErr = require('../errors/UserIsAlreadtExistsErr');
const ValidationErr = require('../errors/ValidationErr');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new UserIsAlreadtExistsErr());
      } else if (err._message === 'user validation failed') {
        next(new ValidationErr());
      } else {
        next(new UnknownErr(err.message));
      }
    });
};
