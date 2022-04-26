const moviesRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getSavedMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  movieSchema,
  movieIdSchema,
} = require('../middlewares/validationSchema');

usersRouter.get('/', getSavedMovies);
usersRouter.post('/', celebrate(movieSchema), createMovie);
usersRouter.delete('/:movieId', celebrate(movieIdSchema), deleteMovie);

module.exports = moviesRouter;