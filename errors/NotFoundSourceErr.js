class NotFoundSourceErr extends Error {
  constructor() {
    super();
    this.message = 'Запрашиваемый ресурс не найден';
    this.statusCode = 404;
  }
}

module.exports = NotFoundSourceErr;
