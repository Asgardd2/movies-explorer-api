class NotFoundObjErr extends Error {
  constructor() {
    super();
    this.message = 'Запрашиваемого обьекта не существует';
    this.statusCode = 404;
  }
}

module.exports = NotFoundObjErr;
