import React, { Component } from "react";
import Header from "./partials/Header"
import Offer from "./partials/Offer"
import GiveARide from "./partials/GiveARide";
import { NavLink } from 'react-router-dom';

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
        <GiveARide />
      </div>
    );
  }
}

export default Dashboard;
