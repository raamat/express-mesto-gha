function handleErrors(err, req, res, next) {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ mesage: `Произошла ошибка в работе сервера ${err}` });
  }
  next();
}

module.exports = handleErrors;
