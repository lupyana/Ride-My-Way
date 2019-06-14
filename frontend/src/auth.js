class Auth {
  constructor() {
    this.authenticated = false;
  }
  login(cb) {
    this.authenticated = true;
    cb();
  }
  logOut(cb) {
    localStorage.clear();
    this.authenticated = false;
    cb();
  }
  isAuthenticated() {
    if (localStorage.getItem("authToken") && localStorage.getItem("user")) {
      this.authenticated = true;
    }
    return this.authenticated;
  }
}

export default new Auth();
