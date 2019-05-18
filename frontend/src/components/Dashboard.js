import React, { Component } from "react";
import Header from "./partials/Header"
import Offer from "./partials/Offer"

import '../css/form.css';
// import { NavLink } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header />

          <div class="width-80p center ">
            <div class="offer-list">
              <Offer />
            </div>
          </div>
          <button class="open-button" >Give a Ride</button>

      </div>
    );
  }
}

export default Dashboard;
