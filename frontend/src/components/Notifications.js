import React, { Component } from "react";
import Header from "./partials/Header";
import axios from "axios";
import moment from "moment";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      rides: []
    };
  }
  acceptOffer(id, ride_id) {
    axios({
      method: "put", //you can set what request you want to be
      url:
        "https://lupyana-ridemyway-api.herokuapp.com/api/v1/users/rides/" +
        ride_id +
        "/requests/" +
        id,
      headers: {
        Authorization: localStorage.authToken
      }
    }).then(() => {
      this.fetchNewData();
    });
  }
  fetchNewData() {
    axios({
      method: "get", //you can set what request you want to be
      url: "/users/rides/" + JSON.parse(localStorage.user).id + "/requests/",
      headers: {
        Authorization: localStorage.authToken
      }
    }).then(response => {
      this.setState({
        rides: response.data.data
      });
    });
    axios({
      method: "get", //you can set what request you want to be
      url: "/users/rides/" + JSON.parse(localStorage.user).id + "/offers/",
      headers: {
        Authorization: localStorage.authToken
      }
    }).then(response => {
      this.setState({
        offers: response.data.data
      });
    });
  }
  componentDidMount() {
    this.fetchNewData();
  }
  render() {
    return (
      <div>
        <Header />
        <div className="width-80p center ">
          <h2>Requested Rides:</h2>

          <table className="ride-list">
            <tbody>
              <tr>
                <th> Date </th>
                <th> Driver </th>
                <th> Passenger </th>
                <th> From </th>
                <th> To </th>
                <th>Status</th>
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
                  <td> {ride.status === 5 ? "Pending" : "Resolved"} </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Offered Rides:</h2>
          {this.state.offers.length < 1 ? (
            <p> You do not have any active offers</p>
          ) : (
            <table className="ride-list">
              <tbody>
                <tr>
                  <th> Date </th>
                  <th> Time (Hrs)</th>
                  <th> Driver </th>
                  <th> Passenger </th>
                  <th> From </th>
                  <th> To </th>
                  <th>Action</th>
                </tr>
                {this.state.offers.map(ride => (
                  <tr key={ride.id}>
                    <td>
                      {" "}
                      {moment().format(
                        "dddd, MMMM Do YYYY",
                        ride.created_date
                      )}{" "}
                    </td>
                    <td>{ride.ride_time}</td>
                    <td> Me </td>
                    <td> {ride.user_id}</td>
                    <td> {ride.ride_start} </td>
                    <td> {ride.ride_to} </td>
                    <td>
                      {ride.status === "5" ? (
                        <button
                          type="button"
                          name="button"
                          className="input-button"
                          onClick={() =>
                            this.acceptOffer(ride.id, ride.ride_id)
                          }
                        >
                          Accept
                        </button>
                      ) : (
                        "Accepted"
                      )}{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

export default Notifications;
