import React, { Component } from "react";
// import { NavLink } from 'react-router-dom';

class Forgot extends Component {
  render() {
    return(
      <div class="width-600 center sign-in-box">
        <div class="text-center">
            <h2>Forgot Password</h2>
        </div>
        <div class="">
          <form class="" action="" method="post">
            <label for="loginInput" class="input-label mb-20">Email address or mobile number</label>
            <div class="spacer">
             <input type="text" name="user" id="loginInput" value="" placeholder="Email or Phonenumber" class="input-box" />
           </div>
             <button type="button" name="button" class="input-button">Reset Password</button> 
          </form>
        </div>
      </div>
    );
  }
}

export default Forgot;
