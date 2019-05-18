import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <div class="custom-header" id>
            <div class="" id="logo">
              <NavLink exact to="/dashboard">Ride My Way</NavLink>
            </div>

            <div class="links">
              <div class="">
                <NavLink exact to="/notifications">Notifications</NavLink>
              </div>
              <div class="side-dropdown dropdown">
                John Doe
                <div class="dropdown-content">
                  <NavLink exact to="/profile">Profile</NavLink>
                  <NavLink exact to="/">Log Out</NavLink>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
