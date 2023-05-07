class DocumentNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DocumentNotFound';
    this.statusCode = 404;
  }
}

module.exports = DocumentNotFoundError;
