class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    if (!this.message) {
      this.message = 'Запрещено удалять чужие карточки';
    }
  }
}

module.exports = ForbiddenError;
