import React, { Component } from "react";
import Header from "./partials/Header"
import Offer from "./partials/Offer"
import GiveARide from "./partials/GiveARide";
import { NavLink } from 'react-router-dom';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rides: [{
        from: "Upanga",
        to: "Buguruni",
        with: "Not Joe",
        time: "1200 hrs",
      },
      {
        from: "Masaki",
        to: "Mbezi",
        with: "Anovic",
        time: "1300 hrs",
      },
      {
        from: "Masaki",
        to: "Victoria",
        with: "Kevin Joe",
        time: "1300 hrs",
      },
      {
        from: "Bamaga",
        to: "Mbezi",
        with: "Ben Teyga",
        time: "1800 hrs",
      }]
    };
  }
  render() {
    return (
      <div>
        <Header />
        <div className="width-80p center ">
          <div className="offer-list">
            {this.state.rides.map(ride => <NavLink exact to="view-ride"><Offer ride={ride} /></NavLink>)}
          </div>
        </div>
        <GiveARide />
      </div>
    );
  }
}

export default Dashboard;
