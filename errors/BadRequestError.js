class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    if (!this.message) {
      this.message = 'Ошибка в введеных данных';
    }
  }
}

module.exports = BadRequestError;
