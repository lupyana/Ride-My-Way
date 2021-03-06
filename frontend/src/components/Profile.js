import React, { Component } from "react";
import Header from "./partials/Header";
import "../css/profile.css";
import axios from "axios";
import moment from "moment";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      rides: []
    };
  }
  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.user)
    });
    axios
      .get("/users/" + JSON.parse(localStorage.user).id + "/rides/history", {
        headers: {
          Authorization: localStorage.authToken
        }
      })
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
          <div className="user-info">
            <div className="profile-info">
              <h2>About me</h2>
              <div className="">
                <img src="https://via.placeholder.com/150.png" alt="" />
              </div>
              <div className="about">
                <p>
                  {" "}
                  {this.state.user.fname} {this.state.user.lname}
                </p>
                <p> +255 123 456 </p>
                <p> {this.state.user.email} </p>
              </div>
            </div>
            <div className="stats">
              <h2>Some few stats about you: </h2>
              <p>Total rides taken: {this.state.rides.length} </p>
            </div>
          </div>
          <div className="text-center">
            <h2>Previously on ride my way</h2>
            <table className="ride-list">
              <tbody>
                <tr>
                  <th> On </th>
                  <th> Driver </th>
                  <th> Passenger </th>
                  <th> From </th>
                  <th> To </th>
                </tr>
                {this.state.rides.map(ride => (
                  <tr key={ride.id}>
                    <td>
                      {" "}
                      {moment().format(
                        "dddd, MMMM Do YYYY",
                        ride.created_date
                      )}{" "}
                    </td>
                    <td> {ride.ride_with} </td>
                    <td> Me </td>
                    <td> {ride.ride_start} </td>
                    <td> {ride.ride_to} </td>
                    <td> </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
