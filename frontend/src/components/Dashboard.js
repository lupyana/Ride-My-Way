import React, { Component } from "react";
import Header from "./partials/Header"
import Offer from "./partials/Offer"
import { NavLink } from 'react-router-dom';
import '../css/form.css';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header />

          <div class="width-80p center ">
            <div class="offer-list">
              <NavLink exact to="view-ride"><Offer /></NavLink>
            </div>
          </div>
          <button class="open-button" >Give a Ride</button>

      </div>
    );
  }
}

export default Dashboard;
