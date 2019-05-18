import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <div >
        <div className="width-600 center sign-in-box">
          <div className="text-center">
              <h2>Sign In</h2>
          </div>
          <div className="">
            <form className="" action="" method="post">
              <label htmlFor="loginInput" className="input-label mb-20">Email address or mobile number:</label>
              <div className="spacer">
               <input type="text" name="user" id="loginInput" placeholder="Email or Phonenumber" className="input-box"/>
             </div>
             <label htmlFor="loginPassword" className="input-label mb-20">Password: </label>
             <div className="spacer">
              <input type="text" name="password" id="loginPassword" placeholder="Password" className="input-box"/>
            </div>
                <NavLink exact to="/dashboard">
                  <button type="button" name="button" className="input-button">Sign In</button>
                </NavLink>
            </form>
          </div>

                  <div className="">
                    <div className="bottom-links text-left width-50">
                      Don't have an account yet?
                      <NavLink exact to="/register">Sign Up</NavLink>
                    </div>
                    <div className="bottom-links text-right width-50">
                        <NavLink exact to="/forgot-password">Forgot password?</NavLink>
                    </div>
                  </div>
          </div>
      </div>
    );
  }
}

export default Login;
