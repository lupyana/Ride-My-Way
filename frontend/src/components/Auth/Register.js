import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class Register extends Component {
  render() {
    return(
      <div className="width-600 center sign-in-box">
        <div className="text-center">
            <h2>Sign Up</h2>
            <p> Just a few details, We will get you up and going in minutes.</p>
        </div>
        <div className="">
          <form className="" action="" method="post">
            <label htmlFor="loginInput" className="input-label mb-20">Email address or mobile number</label>
            <div className="spacer">
             <input type="text" name="user" id="loginInput"  placeholder="Email or Phonenumber" className="input-box"/>
           </div>
           <label htmlFor="loginPassword" className="input-label mb-20">Password</label>
           <div className="spacer">
            <input type="text" name="password" id="loginPassword"  placeholder="Password" className="input-box" />
          </div>
          <label htmlFor="loginPasswordConfirm" className="input-label mb-20">Confirm Password</label>
          <div className="spacer">
           <input type="text" name="re-password" id="loginPasswordConfirm"  placeholder="Confirm Password" className="input-box"/>
         </div>
          <NavLink exact to="/verification">
            <button type="button" name="button" className="input-button">Sign Up</button>
            </NavLink>
          </form>
        </div>

        <div className="">
          <div className="bottom-links text-left width-50">
            Already have an account?
              <NavLink exact to="/">Sign In</NavLink>
          </div>

        </div>

      </div>
    );
  }
}

export default Register;
