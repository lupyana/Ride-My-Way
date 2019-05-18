import React, { Component } from "react";
import Header from "./partials/Header"

class Notifications extends Component {
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
                <th> Fare</th>
                <th>Status</th>

              </tr>
              <tr>
                <td> dd/mm/yyy </td>
                <td> Kevin </td>
                <td> Me </td>
                <td> Masaki </td>
                <td> Morocco </td>
                <td> 2,000 </td>
                <th> Pending</th>
              </tr>
            </tbody>
          </table>

          <h2>Offerd Rides:</h2>
          <p> You do not have any active offers</p>
        </div>
      </div>
    );
  }
}

export default Notifications;
