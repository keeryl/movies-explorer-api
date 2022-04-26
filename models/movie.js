const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    // url
  },
  trailerLink: {
    type: String,
    required: true,
    // ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
  },
  thumbnail: {
    type: String,
    required: true,
    // миниатюрное изображение постера к фильму. Обязательное поле-строка. Запишите её URL-адресом.
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    // id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
  },
  nameRU: {
    // название фильма на русском языке. Обязательное поле-строка.
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
    // название фильма на английском языке. Обязательное поле-строка.
  }
});

module.exports = mongoose.model('movie', movieSchema);
