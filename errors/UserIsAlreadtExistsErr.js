class UserIsAlreadtExistsErr extends Error {
  constructor() {
    super();
    this.message = 'Пользователь уже существует';
    this.statusCode = 409;
  }
}

module.exports = UserIsAlreadtExistsErr;
