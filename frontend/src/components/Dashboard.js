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

  fetchNewData() {
    axios
      .get("api/v1/rides", {
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
  componentDidMount() {
    this.fetchNewData();
  }
  handler() {
    this.fetchNewData();
  }
  render() {
    return (
      <div>
        <Header />
        <div className="width-80p center ">
          <div className="offer-list">
            {this.state.rides.map(ride => (
              <NavLink
                to={{ pathname: "view-ride", rideDetails: ride }}
                key={ride.id}
              >
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
