const Router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getSavedMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  login,
  createUser,
  getCurrentUser,
  updateUserProfile,
} = require('../controllers/users');
const {
  validateSignin,
  validateSignup,
  validateMovie,
  validateMovieId,
  validateUpdateUser,
} = require('../middlewares/validation');

Router.post('/signin', validateSignin, login);
Router.post('/signup', validateSignup, createUser);
Router.use(auth);
Router.get('/users/me', getCurrentUser);
Router.patch('/users/me', validateUpdateUser, updateUserProfile);
Router.delete('/movies/:movieId', validateMovieId, deleteMovie);
Router.get('/movies', getSavedMovies);
Router.post('/movies', validateMovie, createMovie);

module.exports = Router;
