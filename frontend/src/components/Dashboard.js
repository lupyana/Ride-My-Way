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
        <div className="width-80p center ">
          <div className="offer-list">
            <NavLink exact to="view-ride"><Offer /></NavLink>
          </div>
        </div>
        <GiveARide />
      </div>
    );
  }
}

export default Dashboard;
