const User = require('../models/user');
const UnknownErr = require('../errors/UnknownErr');
const ValidationErr = require('../errors/ValidationErr');
const NotFoundObjErr = require('../errors/NotFoundObjErr');

module.exports.getUserData = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        throw new Error('incorrect data');
      }
      res.send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationErr());
      } else if (err.message === 'incorrect data') {
        next(new NotFoundObjErr());
      } else {
        next(new UnknownErr(err.message));
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { runValidators: true, new: true },
  )
    .then((user) => {
      if (user === null) {
        throw new Error('incorrect data');
      }
      res.send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationErr());
      } else if (err.message === 'incorrect data') {
        next(new NotFoundObjErr());
      } else if (err.name === 'ValidationError') {
        next(new ValidationErr());
      } else {
        next(new UnknownErr(err.message));
      }
    });
};

/*


module.exports.getUserData = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        throw new Error('incorrect data');
      }
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationErr());
      } else if (err.message === 'incorrect data') {
        next(new NotFoundObjErr());
      } else {
        next(new UnknownErr(err.message));
      }
    });
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(
      users.map((item) => ({
        name: item.name,
        about: item.about,
        avatar: item.avatar,
        email: item.email,
        _id: item._id,
      })),
    ))
    .catch((err) => {
      next(new UnknownErr(err.message));
    });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        throw new Error('incorrect data');
      }
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationErr());
      } else if (err.message === 'incorrect data') {
        next(new NotFoundObjErr());
      } else {
        next(new UnknownErr(err.message));
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { runValidators: true, new: true },
  )
    .then((user) => {
      if (user === null) {
        throw new Error('incorrect data');
      }
      res.send({
        name: user.name,
        about: user.about,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationErr());
      } else if (err.message === 'incorrect data') {
        next(new NotFoundObjErr());
      } else if (err.name === 'ValidationError') {
        next(new ValidationErr());
      } else {
        next(new UnknownErr(err.message));
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { runValidators: true, new: true },
  )
    .then((user) => {
      if (user === null) {
        throw new Error('incorrect data');
      }
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationErr());
      } else if (err.message === 'incorrect data') {
        next(new NotFoundObjErr());
      } else if (err.name === 'ValidationError') {
        next(new ValidationErr());
      } else {
        next(new UnknownErr(err.message));
      }
    });
};
*/