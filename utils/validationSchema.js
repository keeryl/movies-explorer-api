const { Joi, Segments } = require('celebrate');
const validator = require('validator');

const loginSchema = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.error('string.notEmail');
      }
      return value;
    }).messages({
      'any.required': 'Не указан e-mail',
      'string.notEmail': 'Указан некорректный e-mail',
    }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Не указан пароль',
      }),
  }),
};

const userSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const movieSchema = {
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        return helper.error('string.notURL');
      }
      return value;
    }).messages({
      'string.notURL': 'Указан некорректный адрес URL',
    }),
    trailerLink: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        return helper.error('string.notURL');
      }
      return value;
    }).messages({
      'string.notURL': 'Указан некорректный адрес URL',
    }),
    thumbnail: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        return helper.error('string.notURL');
      }
      return value;
    }).messages({
      'string.notURL': 'Указан некорректный адрес URL',
    }),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

const movieIdSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
};

module.exports = {
  userSchema,
  loginSchema,
  movieSchema,
  movieIdSchema,
};
