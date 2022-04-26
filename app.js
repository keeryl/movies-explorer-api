require('dotenv').config({ debug: true });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const moviesRouter = require('./routes/movies');
const usersRouter = require('./routes/users');
const { errorHandler } = require('./middlewares/errorHandler');
const { NotFoundError } = require('./utils/custom_errors/NotFoundError');

const {
  userSchema,
  loginSchema,
} = require('./middlewares/validationSchema');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});



app.post('/signin', celebrate(loginSchema), login);
app.post('/signup', celebrate(userSchema), createUser);
app.use(auth);
app.use('/movies', moviesRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => next(new NotFoundError('Запрошенный роут не существует')));
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);