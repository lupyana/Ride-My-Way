import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import auth from "../../auth";
class Header extends Component {
  logOut(e) {
    e.preventDefault();
    auth.logOut(() => {});
    // this.props.history.push("/login");
  }
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
                  <NavLink onClick={this.logOut}>Log Out</NavLink>
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
