import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class Verify extends Component {
  render() {
    return(
      <div className="width-600 center sign-in-box">
        <div className="text-center">
            <h2>Just checking if its you!</h2>
            <p>We have sent a code to your email / phonenumber, please enter to continue</p>
        </div>
        <div className="">
          <form className="" action="" method="post">
            <label htmlFor="verification_code" className="input-label mb-20">Verification code:</label>
            <div className="spacer">
              <input type="text" name="verification_code" id="verification_code" placeholder="CODE" className="input-box" />
            </div>
            <NavLink exact to="/">
              <button type="button" name="button" className="input-button">VERIFY</button>
            </NavLink>
          </form>
        </div>
      </div>
    );
  }
}

export default Verify;
