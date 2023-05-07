class EmailExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ThisEmailExists';
    this.statusCode = 409;
  }
}

module.exports = EmailExistsError;
