const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserData,
  updateProfile
} = require('../controllers/users');

router.get('/me', getUserData);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateProfile);



module.exports = router;
/*
const {
  getAllUsers,
  getUserById,
  getUserData,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/me', getUserData);

router.get('/', getAllUsers);

router.get('/:userId', celebrate({
  // валидируем параметр
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUserById);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(/^(https?:\/\/)?([a-zA-z0-9%$&=?/.-]+)\.([a-zA-z0-9%$&=?/.-]+)([a-zA-z0-9%$&=?/.-]+)?(#)?$/),
    }),
  }),
  updateAvatar,
);


*/