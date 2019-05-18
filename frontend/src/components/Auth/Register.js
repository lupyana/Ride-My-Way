import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class Register extends Component {
  render() {
    return(
      <div class="width-600 center sign-in-box">
        <div class="text-center">
            <h2>Sign Up</h2>
        </div>
        <div class="">
          <form class="" action="" method="post">
            <label for="loginInput" class="input-label mb-20">Email address or mobile number</label>
            <div class="spacer">
             <input type="text" name="user" id="loginInput" value="" placeholder="Email or Phonenumber" class="input-box"/>
           </div>
           <label for="loginPassword" class="input-label mb-20">Password</label>
           <div class="spacer">
            <input type="text" name="password" id="loginPassword" value="" placeholder="Password" class="input-box" />
          </div>
          <label for="loginPasswordConfirm" class="input-label mb-20">Confirm Password</label>
          <div class="spacer">
           <input type="text" name="re-password" id="loginPasswordConfirm" value="" placeholder="Confirm Password" class="input-box"/>
         </div>
            <a href="verify.html"> <button type="button" name="button" class="input-button">Sign Up</button> </a>
          </form>
        </div>

        <div class="">
          <div class="bottom-links text-left width-50">
            Already have an account?
              <NavLink exact to="/">Sign In</NavLink>
          </div>

        </div>

      </div>
    );
  }
}

export default Register;
