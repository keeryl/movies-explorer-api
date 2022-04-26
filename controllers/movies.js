const Movie = require('../models/movie');


module.exports.getSavedMovies = (req, res, next) => {
  Movie.find({})
  .then((movies) => res.send(movies))
  .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create(req.body)
    .then(movie => {

    })
    .catch(err => {
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
      return Movie.findByIdAndRemove(req.params.movieId);
    })
    .then((deletedMovie) => res.send({ deletedMovie }))
    .catch(next);
};