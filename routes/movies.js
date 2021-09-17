const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');


router.get('/', getAllMovies);

router.post(
  '/',
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

router.delete('/:movieId',
  celebrate({
  // валидируем параметр
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex(),
    }),
  }), deleteMovie);

module.exports = router;
/*
const {
  getAllCards,
  createCard,
  deleteCard,
  setLike,
  unsetLike,
} = require('../controllers/movies');

router.get('/', getAllCards);

router.post(
  '/',
  celebrate({
    // валидируем параметр
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(/^(https?:\/\/)?([a-zA-z0-9%$&=?/.-]+)\.([a-zA-z0-9%$&=?/.-]+)([a-zA-z0-9%$&=?/.-]+)?(#)?$/),
    }),
  }),
  createCard,
);

router.delete('/:cardId',
  celebrate({
  // валидируем параметр
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }), deleteCard);

router.put('/likes/:cardId', celebrate({
  // валидируем параметр
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), setLike);

router.delete('/likes/:cardId', celebrate({
  // валидируем параметр
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), unsetLike);

/*

*/




