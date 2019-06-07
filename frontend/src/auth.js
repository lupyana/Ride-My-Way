class Auth {
  constructor() {
    this.authenticated = false;
  }
  login(cb) {
    this.authenticated = true;
    cb();
  }
  logut(cb) {
    this.authenticated = false;
    cb();
  }
  isAuthenticated() {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      this.authenticated = true;
    }
    return this.authenticated;
  }
}

export default new Auth();
