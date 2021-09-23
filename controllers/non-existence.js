const NotFoundSourceErr = require('../errors/NotFoundSourceErr');

module.exports.sendMessageNonExistence = (req, res, next) => {
  next(new NotFoundSourceErr());
};
