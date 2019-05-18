import React, { Component } from "react";
import Header from "./partials/Header"
import '../css/profile.css';

class Profile extends Component {
  render() {
    return (
      <div>
        <Header />
        <div class="width-80p center ">
          <div class="user-info">
            <div class="profile-info">
              <h2>About me</h2>
              <div class="">
                <img src="https://via.placeholder.com/150.png" alt="" />
              </div>
              <div class="about">
                <p>John Doe</p>
                <p> +255 123 456 </p>
                <p> johndoe@one.com </p>
              </div>
            </div>
            <div class="stats">
              <h2>Some few stats about you: </h2>
              <p>Total rides taken: 12 </p>
              <p>Total rides givien to others: 12 </p>
            </div>
          </div>
            <div class="text-center">
              <h2>Previously on ride my way</h2>
              <table class="ride-list">
                <tr>
                  <th> Date </th>
                  <th> Driver </th>
                  <th> Passenger </th>
                  <th> From </th>
                  <th> To </th>
                  <th> Fare</th>
                </tr>
                <tr>
                  <td> dd/mm/yyy </td>
                  <td> Kevin </td>
                  <td> Me </td>
                  <td> Masaki </td>
                  <td> Morocco </td>
                  <td> 2,000 </td>
                </tr>
                <tr>
                  <td> dd/mm/yyy </td>
                  <td> Kevin </td>
                  <td> Me </td>
                  <td> Masaki </td>
                  <td> Morocco </td>
                  <td> 2,000 </td>
                </tr>
                <tr>
                  <td> dd/mm/yyy </td>
                  <td> Kevin </td>
                  <td> Me </td>
                  <td> Masaki </td>
                  <td> Morocco </td>
                  <td> 2,000 </td>
                </tr>
                <tr>
                  <td> dd/mm/yyy </td>
                  <td> Kevin </td>
                  <td> Me </td>
                  <td> Masaki </td>
                  <td> Morocco </td>
                  <td> 2,000 </td>
                </tr>
                <tr>
                  <td> dd/mm/yyy </td>
                  <td> Kevin </td>
                  <td> Me </td>
                  <td> Masaki </td>
                  <td> Morocco </td>
                  <td> 2,000 </td>
                </tr>
              </table>
            </div>
        </div>
      </div>
    );
  }
}

export default Profile;
