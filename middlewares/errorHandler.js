const {
  ERROR_500,
  SERVER_ERROR_MESSAGE,
} = require('../utils/constants');

module.exports.errorHandler = (err, req, res, next) => {
  const status = err.statusCode || ERROR_500;

  res.status(status).send({
    message: status !== ERROR_500 ? err.message : SERVER_ERROR_MESSAGE,
    err,
  });

  return next();
};
