import React, { Component } from "react";
import Header from "./partials/Header";
import MapView from "./partials/MapView";
import axios from "axios";

// import { NavLink } from 'react-router-dom';
import "../css/ride.css";

class ViewRide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rides: []
    };
    this.requestRide = this.requestRide.bind(this);
  }
  renderInputField() {
    if (this.state.rides.ride_with == JSON.parse(localStorage.user).id) {
      return null;
    } else {
      return (
        <button
          type="button"
          name="button"
          className="input-button"
          onClick={this.requestRide}
        >
          REQUEST RIDE
        </button>
      );
    }
  }
  requestRide() {
    axios({
      method: "post", //you can set what request you want to be
      url:
        "https://lupyana-ridemyway-api.herokuapp.com/api/v1/rides/" +
        this.props.location.rideDetails.id +
        "/request",
      data: {
        ride_id: this.props.location.rideDetails.id,
        user_id: JSON.parse(localStorage.user).id
      },
      headers: {
        Authorization: localStorage.authToken
      }
    })
      .then(response => {
        alert("request has been recieved");
      })
      .catch(error => alert(error.message));
  }

  componentDidMount() {
    axios
      .get(
        "https://lupyana-ridemyway-api.herokuapp.com/api/v1/rides/" +
          this.props.location.rideDetails.id,
        {
          headers: {
            Authorization: localStorage.authToken
          }
        }
      )
      .then(response => {
        this.setState({
          rides: response.data.data
        });
      });
  }
  render() {
    return (
      <div>
        <Header />
        <div className="width-80p center ">
          <div className="ride-info">
            <MapView />
            <div className="side-side">
              <div className="width-70">
                <h2>Ride Details</h2>
                <p>
                  Driver: {this.props.location.rideDetails.fname}{" "}
                  {this.props.location.rideDetails.lname}{" "}
                </p>
                <p>
                  From: {this.props.location.rideDetails.ride_start} to{" "}
                  {this.props.location.ride_to}
                </p>
                <p>Time: {this.props.location.rideDetails.ride_time} hrs</p>
              </div>
              <div className=" width-30 price-action text-center">
                <div className="width-100">{this.renderInputField()}</div>
              </div>
            </div>
            <div className="width-50 mb-20">
              <h2>Reviews and Ratings</h2>
              <p>Some stars </p>
              <div className="review">
                <p>
                  <b>A random user</b>
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
              <div className="review">
                <p>
                  <b>A random user</b>
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
              <div className="review">
                <p>
                  <b>A random user</b>
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewRide;
