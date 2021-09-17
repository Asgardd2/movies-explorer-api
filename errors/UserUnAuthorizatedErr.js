class UserUnAuthorizatedErr extends Error {
  constructor() {
    super();
    this.message = 'Необходима авторизация';
    this.statusCode = 401;
  }
}

module.exports = UserUnAuthorizatedErr;
