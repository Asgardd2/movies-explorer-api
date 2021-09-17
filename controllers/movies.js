const Movie = require('../models/movie');
const ValidationErr = require('../errors/ValidationErr');
const UnknownErr = require('../errors/UnknownErr');
const NotFoundObjErr = require('../errors/NotFoundObjErr');
const InsufficientPrivsErr = require('../errors/InsufficientPrivsErr');

module.exports.getAllMovies = (req, res, next) => {

  Movie.find({})
    .then((movies) => res.send(
      movies.map((item) => ({
        _id: item._id,
        country: item.country,
        director: item.director,
        duration: item.duration,
        year: item.year,
        description: item.description,
        image: item.image,
        trailer: item.trailer,
        thumbnail: item.thumbnail,
        owner: item.owner,
        movieId: item.movieId,
        nameRU: item.nameRU,
        nameEN: item.nameEN,
      })),
    ))
    .catch((err) => {
      next(new UnknownErr(err.message));
    });
  };



  module.exports.addMovie = (req, res, next) =>{

    const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId  } = req.body;
    const owner = req.user._id;
    Movie.create({ owner,country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId })
      .then((item) =>
{
      res.send({
        _id: item._id,
        country: item.country,
        director: item.director,
        duration: item.duration,
        year: item.year,
        description: item.description,
        image: item.image,
        trailer: item.trailer,
        thumbnail: item.thumbnail,
        owner: item.owner,
        movieId: item.movieId,
        nameRU: item.nameRU,
        nameEN: item.nameEN,
      })
    }
      )
      .catch((err) => {
        console.log(err);
        if (err.name === 'ValidationError') {
          next(new ValidationErr());
        } else {
          next(new Error('Неизвестная ошибка'));
        }
      });
  };

  module.exports.deleteMovie = (req, res, next) => {
    Movie.findById(req.params.movieId)
      .then((movie) => {
        console.log(movie.owner);
        if (movie === null) {
          throw new Error('incorrect data');
        }
        if (!movie.owner.equals(req.user._id)) {
          throw new Error('Фильм другого пользователя');
        }

        return movie._id;
      })
      .then(() => {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((item) => {
            res.send({
              _id: item._id,
              country: item.country,
              director: item.director,
              duration: item.duration,
              year: item.year,
              description: item.description,
              image: item.image,
              trailer: item.trailer,
              thumbnail: item.thumbnail,
              owner: item.owner,
              movieId: item.movieId,
              nameRU: item.nameRU,
              nameEN: item.nameEN,
            });
          })
          .catch(() => {
            // console.log(1,err.message);
            throw new Error('Неизвестная ошибка');
          });
      })
      .catch((err) => {
        console.log(err);
        if (err.name === 'CastError') {
          next(new ValidationErr());
        } else if (err.message === 'incorrect data') {
          next(new NotFoundObjErr());
        } else if (err.message === 'Фильм другого пользователя') {
          next(new InsufficientPrivsErr());
        } else {
          next(new UnknownErr(err.message));
        }
      });
  };
/*
const ValidationErr = require('../errors/ValidationErr');
const UnknownErr = require('../errors/UnknownErr');
const NotFoundObjErr = require('../errors/NotFoundObjErr');
const InsufficientPrivsErr = require('../errors/InsufficientPrivsErr');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(
      cards.map((item) => ({
        likes: item.likes,
        _id: item._id,
        name: item.name,
        link: item.link,
        owner: item.owner,
        createdAt: item.createdAt,
      })),
    ))
    .catch((err) => {
      next(new UnknownErr(err.message));
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({
      likes: card.likes,
      _id: card._id,
      name: card.name,
      link: card.link,
      owner: card.owner,
      createdAt: card.createdAt,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationErr());
      } else {
        next(new Error('Неизвестная ошибка'));
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card === null) {
        throw new Error('incorrect data');
      }
      if (!card.owner.equals(req.user._id)) {
        throw new Error('Карточка другого пользователя');
      }

      return card._id;
    })
    .then(() => {
      Card.findByIdAndRemove(req.params.cardId)
        .then((card) => {
          res.send({
            likes: card.likes,
            _id: card._id,
            name: card.name,
            link: card.link,
            owner: card.owner,
            createdAt: card.createdAt,
          });
        })
        .catch(() => {
          // console.log(1,err.message);
          throw new Error('Неизвестная ошибка');
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationErr());
      } else if (err.message === 'incorrect data') {
        next(new NotFoundObjErr());
      } else if (err.message === 'Карточка другого пользователя') {
        next(new InsufficientPrivsErr());
      } else {
        next(new UnknownErr(err.message));
      }
    });
};

module.exports.setLike = (req, res, next) => {
  // перенесите код сюда
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { runValidators: true, new: true },
  )
    .then((card) => {
      if (card === null) {
        throw new Error('incorrect data');
      }
      res.send({
        likes: card.likes,
        _id: card._id,
        name: card.name,
        link: card.link,
        owner: card.owner,
        createdAt: card.createdAt,
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

module.exports.unsetLike = (req, res, next) => {
  // перенесите код сюда
//
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { runValidators: true, new: true },
  )
    .then((card) => {
      if (card === null) {
        throw new Error('incorrect data');
      }
      res.send({
        likes: card.likes,
        _id: card._id,
        name: card.name,
        link: card.link,
        owner: card.owner,
        createdAt: card.createdAt,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.send(req.user);
        next(new ValidationErr());
      } else if (err.message === 'incorrect data') {
        next(new NotFoundObjErr());
      } else {
        next(new UnknownErr(err.message));
      }
    });
};
*/