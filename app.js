require('dotenv').config({ debug: true });

const { PORT, DATABASE, NODE_ENV } = process.env;
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
const {
  limiterOptions,
  CRASH_TEST_MESSAGE,
  ROUTE_ERROR_MESSAGE,
} = require('./utils/constants');

const app = express();
mongoose.connect(
  NODE_ENV === 'production' ? DATABASE : 'mongodb://localhost:27017/moviesdb',
  {
    useNewUrlParser: true,
  },
);
app.use(requestLogger);
app.use(rateLimiter(limiterOptions));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(CRASH_TEST_MESSAGE);
  }, 0);
});

app.use(require('./routes/index'));

app.use((req, res, next) => next(new NotFoundError(ROUTE_ERROR_MESSAGE)));
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(NODE_ENV === 'production' ? PORT : 3000);
