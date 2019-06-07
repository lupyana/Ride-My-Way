import React, { Component } from "react";
import Header from "./partials/Header";
import Offer from "./partials/Offer";
import GiveARide from "./partials/GiveARide";
import { NavLink } from "react-router-dom";
import axios from "axios";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);

    this.state = {
      rides: []
    };
  }
  componentDidMount() {
    axios
      .get("/rides", {
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
  handler(someValue) {
    this.setState({
      rides: [...this.state.rides, someValue]
    });
  }
  render() {
    return (
      <div>
        <Header />
        <div className="width-80p center ">
          <div className="offer-list">
            {this.state.rides.map(ride => (
              <NavLink to={{ pathname: "view-ride", rideDetails: ride }}>
                <Offer ride={ride} />
              </NavLink>
            ))}
          </div>
        </div>
        <GiveARide handler={this.handler} />
      </div>
    );
  }
}

export default Dashboard;
