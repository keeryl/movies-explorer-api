const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getCurrentUser,
  updateUserProfile,
} = require('../controllers/users');
const {
  updateUserSchema,
} = require('../utils/validationSchema');

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', celebrate(updateUserSchema), updateUserProfile);

module.exports = usersRouter;
