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
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helper) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        return helper.error('string.notURL');
      }
      return value;
    }).messages({
      'string.notURL': 'Указан некорректный адрес URL',
    }),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const movieSchema = {

}

const movieIdSchema = {

}

module.exports = {
  userSchema,
  loginSchema,
  movieSchema,
  movieIdSchema,
};