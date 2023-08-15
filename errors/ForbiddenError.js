class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.message = 'Запрещено удалять чужие карточки!!!';
  }
}

module.exports = ForbiddenError;
