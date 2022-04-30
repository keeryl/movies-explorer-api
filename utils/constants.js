const ERROR_400 = 400;
const ERROR_401 = 401;
const ERROR_403 = 403;
const ERROR_404 = 404;
const ERROR_409 = 409;
const ERROR_500 = 500;
const SALT_ROUNDS = 10;

const limiterOptions = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
};

module.exports = {
  ERROR_400,
  ERROR_401,
  ERROR_403,
  ERROR_404,
  ERROR_409,
  ERROR_500,
  SALT_ROUNDS,
  limiterOptions,
};
