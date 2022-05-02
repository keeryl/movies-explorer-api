require('dotenv').config({ debug: true });

const { PORT, DATABASE } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');
const { NotFoundError } = require('./utils/custom_errors/NotFoundError');
const { limiterOptions } = require('./utils/constants');

const app = express();
mongoose.connect(DATABASE, { useNewUrlParser: true });
app.use(requestLogger);
app.use(rateLimiter(limiterOptions));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(require('./routes/index'));

app.use((req, res, next) => next(new NotFoundError('Запрошенный роут не существует')));
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
