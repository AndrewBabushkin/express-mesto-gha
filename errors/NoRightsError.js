class NoRightsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoRightsToDelete';
    this.statusCode = 403;
  }
}

module.exports = NoRightsError;
