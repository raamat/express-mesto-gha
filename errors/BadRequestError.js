class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.message = 'Ошибка в введеных данных';
  }
}

module.exports = BadRequestError;
