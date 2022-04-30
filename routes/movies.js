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
} = require('../utils/validationSchema');

moviesRouter.get('/', getSavedMovies);
moviesRouter.post('/', celebrate(movieSchema), createMovie);
moviesRouter.delete('/:movieId', celebrate(movieIdSchema), deleteMovie);

module.exports = moviesRouter;
