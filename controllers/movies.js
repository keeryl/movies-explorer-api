const Movie = require('../models/movie');
const { NotFoundError } = require('../utils/custom_errors/NotFoundError');
const { ForbiddenError } = require('../utils/custom_errors/ForbiddenError');
const { RequestError } = require('../utils/custom_errors/RequestError');

module.exports.getSavedMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError('Некорректные данные при создании фильма.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным id не найден.');
      }
      return movie;
    })
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError('Фильм не принадлежит пользователю');
      }
      return Movie.findByIdAndRemove(movie._id);
    })
    .then((deletedMovie) => res.send({ deletedMovie }))
    .catch(next);
};
