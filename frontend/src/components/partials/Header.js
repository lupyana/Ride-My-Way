import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div>
        <header>
          <div className="custom-header">
            <div className="" id="logo">
              <NavLink exact to="/">
                Ride My Way
              </NavLink>
            </div>

            <div className="links">
              <div className="">
                <NavLink exact to="/notifications">
                  Notifications
                </NavLink>
              </div>
              <div className="side-dropdown dropdown">
                John Doe
                <div className="dropdown-content">
                  <NavLink exact to="/profile">
                    Profile
                  </NavLink>
                  <NavLink exact to="/">
                    Log Out
                  </NavLink>
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
