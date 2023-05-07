class PageNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PageNotFound';
    this.statusCode = 404;
  }
}

module.exports = PageNotFoundError;
