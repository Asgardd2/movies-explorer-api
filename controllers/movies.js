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
      if (err.name === 'ValidationError') {
        next(new ValidationErr());
      } else {
        next(new UnknownErr(err.message));
      }

    });
};

module.exports.addMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    owner,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
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
    .catch((err) => {
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
        .catch((err) => {
          next(new UnknownErr(err.message));
        });
    })
    .catch((err) => {
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
