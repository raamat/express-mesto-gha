const { celebrate, Joi } = require('celebrate');

const { REGULAR_EXPRESSION } = require('../utils/constants');

const validationGetUserById = celebrate({
  params: Joi.object().keys({
    id: Joi
      .string()
      .hex()
      .message('Идентификатор пользователя должен быть в 16-ричной системе')
      .length(24)
      .message('Длина идентификатора пользователя должна быть 24 символа'),
  }),
});

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi
      .string()
      .regex(REGULAR_EXPRESSION)
      .message('Недопустимый URL'),
    email: Joi.string().email().required().min(5),
    password: Joi.string().required().min(8),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().min(5),
    password: Joi.string().required().min(8),
  }),
});

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .required()
      .regex(REGULAR_EXPRESSION)
      .message('Недопустимый URL'),
  }),
});

const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi
      .string()
      .required()
      .regex(REGULAR_EXPRESSION)
      .message('Недопустимый URL'),
  }),
});

const validationCardDelete = celebrate({
  params: Joi.object().keys({
    id: Joi
      .string()
      .hex()
      .message('Идентификатор карточки должен быть в 16-ричной системе')
      .length(24)
      .message('Длина идентификатора карточки должна быть 24 символа'),
  }),
});

module.exports = {
  validationGetUserById,
  validationCreateUser,
  validationLogin,
  validationUpdateUser,
  validationUpdateAvatar,
  validationCreateCard,
  validationCardDelete,
};
