import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import auth from "../../auth";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.user)
    });
  }
  logOut(e) {
    e.preventDefault();
    auth.logOut(() => {});
    // this.props.history.push("/login");
  }
  username() {
    return this.state.user;
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
                {this.state.user.fname} {this.state.user.lname}
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
