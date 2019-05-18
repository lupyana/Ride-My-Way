import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
    <div class="width-600 center sign-in-box">
      <div class="text-center">
          <h2>Sign In</h2>
      </div>
      <div class="">
        <form class="" action="" method="post">
          <label for="loginInput" class="input-label mb-20">Email address or mobile number:</label>
          <div class="spacer">
           <input type="text" name="user" id="loginInput" value="" placeholder="Email or Phonenumber" class="input-box"/>
         </div>
         <label for="loginPassword" class="input-label mb-20">Password: </label>
         <div class="spacer">
          <input type="text" name="password" id="loginPassword" value="" placeholder="Password" class="input-box"/>
        </div>
          <a href="pages/main.html"> <button type="button" name="button" class="input-button">Sign In</button> </a>
        </form>
      </div>

              <div class="">
                <div class="bottom-links text-left width-50">
                  Don't have an account yet?
                    <a href="pages/auth/signUp.html">Sign Up</a>
                </div>
                <div class="bottom-links text-right width-50">
                  <a href="pages/auth/forgot.html">Forgot password?</a>
                </div>
              </div>
      </div>
    </div>
  );
}

export default App;
