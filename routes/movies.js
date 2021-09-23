const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies/', getAllMovies);

router.post(
  '/movies/',
  celebrate({
    // валидируем параметр
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(new RegExp(/^((http|https):\/\/)(www\.)?([\w\W\d]{1,})(\.)([a-zA-Z]{1,10})([\w\W\d]{1,})?$/i)),
      trailer: Joi.string().required().pattern(new RegExp(/^((http|https):\/\/)(www\.)?([\w\W\d]{1,})(\.)([a-zA-Z]{1,10})([\w\W\d]{1,})?$/i)),
      thumbnail: Joi.string().required().pattern(new RegExp(/^((http|https):\/\/)(www\.)?([\w\W\d]{1,})(\.)([a-zA-Z]{1,10})([\w\W\d]{1,})?$/i)),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  addMovie,
);

router.delete('/movies/:movieId',
  celebrate({
  // валидируем параметр
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex(),
    }),
  }), deleteMovie);

module.exports = router;
