const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getCurrentUser,
  updateUserProfile,
} = require('../controllers/users');
const {
  userSchema,
} = require('../utils/validationSchema');

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', celebrate(userSchema), updateUserProfile);

module.exports = usersRouter;