class InsufficientPrivsErr extends Error {
  constructor() {
    super();
    this.message = 'Недостаточно привилегий';
    this.statusCode = 403;
  }
}

module.exports = InsufficientPrivsErr;
