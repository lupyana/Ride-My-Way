import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

class Register extends Component {
  register(e) {
    e.preventDefault();
    if (this.checkpasswords(this.re_password.value, this.password.value)) {
      this.registeUser(
        this.fname.value,
        this.lname.value,
        this.email.value,
        this.password.value
      );
    }
  }
  checkpasswords(pass, pass2) {
    if (pass === pass2) {
      return true;
    } else {
      alert("Passwords do not match");
    }
  }
  registeUser(fname, lname, email, password) {
    axios
      .post("/auth/register", { fname, lname, email, password })
      .then(response => {
        console.log(response.data);
        this.props.history.push("/verification");
      })
      .catch(error => error);
  }
  render() {
    return (
      <div className="width-600 center sign-in-box">
        <div className="text-center">
          <h2>Sign Up</h2>
          <p> Just a few details, We will get you up and going in minutes.</p>
        </div>
        <div className="">
          <form
            className=""
            ref={input => (this.registerForm = input)}
            onSubmit={e => {
              this.register(e);
            }}
          >
            <label htmlFor="fname" className="input-label mb-20">
              First Name:
            </label>
            <div className="spacer">
              <input
                ref={input => (this.fname = input)}
                type="text"
                name="fname"
                id="fname"
                placeholder="First Name"
                className="input-box"
                required
              />
            </div>
            <label htmlFor="lname" className="input-label mb-20">
              Last Name:
            </label>
            <div className="spacer">
              <input
                ref={input => (this.lname = input)}
                type="text"
                name="lname"
                id="lname"
                placeholder="Last Name"
                className="input-box"
                required
              />
            </div>
            <label htmlFor="loginInput" className="input-label mb-20">
              Email address{" "}
            </label>
            <div className="spacer">
              <input
                ref={input => (this.email = input)}
                type="text"
                name="user"
                id="loginInput"
                placeholder="Email"
                className="input-box"
                required
              />
            </div>
            <label htmlFor="loginPassword" className="input-label mb-20">
              Password
            </label>
            <div className="spacer">
              <input
                type="text"
                name="password"
                ref={input => (this.password = input)}
                id="loginPassword"
                placeholder="Password"
                className="input-box"
                required
              />
            </div>
            <label htmlFor="loginPasswordConfirm" className="input-label mb-20">
              Confirm Password
            </label>
            <div className="spacer">
              <input
                type="text"
                ref={input => (this.re_password = input)}
                name="re_password"
                id="loginPasswordConfirm"
                placeholder="Confirm Password"
                className="input-box"
                required
              />
            </div>

            <button type="submit" name="button" className="input-button">
              Sign Up
            </button>
          </form>
        </div>

        <div className="">
          <div className="bottom-links text-left width-50">
            Already have an account?
            <NavLink exact to="/">
              Sign In
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
