import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class Login extends Component {
  signIn(e) {
    e.preventDefault();
    if(this.authUser(this.email.value, this.password.value)) {
       this.props.history.push('/dashboard');
    }
    else {
      console.log("nop");
    }
  }
  authUser(email, password) {
    if((email === "johndoe@example.com") && (password === "password")) {
      return true;
    }
  }
  render() {
    return (
      <div >
        <div className="width-600 center sign-in-box">
          <div className="text-center">
              <h2>Sign In</h2>
          </div>
          <div className="">
            <form className="" ref={input => this.signInForm = input }  onSubmit={(e) =>  {this.signIn(e)}}>
              <label htmlFor="loginInput" className="input-label mb-20">Email address or mobile number:</label>
              <div className="spacer">
               <input type="email" ref={input => this.email = input } name="user" id="loginInput" placeholder="Email" className="input-box" required/>
             </div>
             <label htmlFor="loginPassword" className="input-label mb-20">Password: </label>
             <div className="spacer">
              <input type="text" ref={input => this.password = input } name="password" id="loginPassword" placeholder="Password" className="input-box" required/>
            </div>

            <button type="submit" name="button" className="input-button">Sign In</button>

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

          <div className="text-center">
                <br />
                <h2>Demo creds</h2>
                <p>
                  email: johndoe@example.com
                </p>
                <p>
                  password: password
                </p>
          </div>
          </div>
      </div>
    );
  }
}

export default Login;
