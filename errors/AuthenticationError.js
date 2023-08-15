class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    if (!this.message) {
      this.message = 'Необходима авторизация';
    }
  }
}

module.exports = AuthenticationError;
