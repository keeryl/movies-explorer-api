require('dotenv').config({ debug: true });
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const { SALT_ROUNDS } = require('../utils/constants');
const { NotFoundError } = require('../utils/custom_errors/NotFoundError');
const { AuthError } = require('../utils/custom_errors/AuthError');
const { ConflictError } = require('../utils/custom_errors/ConflictError');
const { RequestError } = require('../utils/custom_errors/RequestError');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Не удалось найти текущего пользователя.');
      }
      return res.send({ user });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }, '+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(`Пользователь ${email} не зарегистрирован`);
      }
      const isValid = bcrypt.compareSync(password.toString(), user.password);
      return { user, isValid };
    })
    .then(({ user, isValid }) => {
      if (!isValid) {
        throw new AuthError('Неправильный логин или пароль');
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь с таким e-mail уже зарегистрирован');
      }
      return bcrypt.hash(password.toString(), SALT_ROUNDS);
    })
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    // блок .then ниже нужен, чтобы не возвращалось поле password
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError('Некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new ConflictError('Указанный email принадлежит другому пользователю.');
      }
      return User.findByIdAndUpdate(
        req.user._id,
        { email, name },
        { new: true, runValidators: true },
      );
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным id не найден.');
      } else {
        return res.send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError('Некорректные данные при обновлении данных пользователя'));
      } else {
        next(err);
      }
    });
};
