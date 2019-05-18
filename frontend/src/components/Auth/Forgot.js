import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class Forgot extends Component {
  render() {
    return(
      <div className="width-600 center sign-in-box">
        <div className="text-center">
            <h2>Forgot Password</h2>
        </div>
        <div className="">
          <form className="" action="" method="post">
            <label htmlFor="loginInput" className="input-label mb-20">Email address or mobile number</label>
            <div className="spacer">
             <input type="text" name="user" id="loginInput" placeholder="Email or Phonenumber" className="input-box" />
            </div>
            <NavLink exact to="/">
              <button type="button" name="button" className="input-button">Reset Password</button>
            </NavLink>
          </form>
        </div>
      </div>
    );
  }
}

export default Forgot;
