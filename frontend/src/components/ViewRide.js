import React, { Component } from "react";
import Header from "./partials/Header"
import MapView from "./partials/MapView"

// import { NavLink } from 'react-router-dom';
import '../css/ride.css';

class ViewRide extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="width-80p center ">
          <div className="ride-info">
            <MapView/>
            <div className="side-side">
              <div className="width-70">
                <h2>
                Ride Details
                </h2>
                <p>Driver: { this.props.location.rideDetails.with }</p>
                <p>
                  From: { this.props.location.rideDetails.from } to { this.props.location.to }
                </p>
                <p>
                Time: { this.props.location.rideDetails.time } hrs
                </p>
              </div>
              <div className=" width-30 price-action text-center">
                <div className="width-100">
                  <p>
                    Price: TZS 12,000 /=
                  </p>
                  <button type="button" name="button" className="input-button">REQUEST RIDE</button>

                </div>
              </div>
            </div>
            <div className="width-50 mb-20">
              <h2>Reviews and Ratings</h2>
              <p>Some stars </p>
              <div className="review">
                <p>
                  <b>A random user</b>
                </p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
              <div className="review">
                <p>
                  <b>A random user</b>
                </p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
              <div className="review">
                <p>
                  <b>A random user</b>
                </p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewRide;
