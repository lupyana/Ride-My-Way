import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  signIn(e) {
    e.preventDefault();
    this.authUser(this.email.value, this.password.value);
  }
  authUser(email, password) {
    axios
      .post("/auth/login", { email, password })
      .then(response => {
        console.log(response.data);
        localStorage.authToken = response.data.access_token;
        localStorage.setItem("user", JSON.stringify(response.data.user));
        this.props.history.push("/dashboard");
      })
      .catch(error => error);
  }
  render() {
    return (
      <div>
        <div className="width-600 center sign-in-box">
          <div className="text-center">
            <h2>Sign In</h2>
            <p> Welcome rider, Identification please: </p>
          </div>
          <div className="">
            <form
              className=""
              ref={input => (this.signInForm = input)}
              onSubmit={e => {
                this.signIn(e);
              }}
            >
              <label htmlFor="loginInput" className="input-label mb-20">
                Email address:
              </label>
              <div className="spacer">
                <input
                  type="email"
                  ref={input => (this.email = input)}
                  name="user"
                  id="loginInput"
                  placeholder="Email"
                  className="input-box"
                  required
                />
              </div>
              <label htmlFor="loginPassword" className="input-label mb-20">
                Password:{" "}
              </label>
              <div className="spacer">
                <input
                  type="text"
                  ref={input => (this.password = input)}
                  name="password"
                  id="loginPassword"
                  placeholder="Password"
                  className="input-box"
                  required
                />
              </div>

              <button type="submit" name="button" className="input-button">
                Sign In
              </button>
            </form>
          </div>

          <div className="">
            <div className="bottom-links text-left width-50">
              Don't have an account yet?
              <NavLink exact to="/register">
                Sign Up
              </NavLink>
            </div>
            <div className="bottom-links text-right width-50">
              <NavLink exact to="/forgot-password">
                Forgot password?
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
