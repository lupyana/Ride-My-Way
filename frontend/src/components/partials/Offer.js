import React, { Component } from "react";
// import { NavLink } from 'react-router-dom';

class Offer extends Component {
  render () {
    return (
      <div className="offer">
        <div className="padding-30">
            <div className="mb-20">
                <img src="https://via.placeholder.com/320x80" alt="" />
            </div>
            <div className="ride-details ">
              <div className="width-50 ride-start mb-10">
                {this.props.ride.from} to {this.props.ride.to}
              </div>
              <div className="width-50 ride-time text-right mb-10">
                Time: { this.props.ride.time }
              </div>
            </div>
            <div className="ride-offerer">
              <div className="width-50 ride-start mb-10">
                <span className="avatar">With: </span> { this.props.ride.with }
              </div>
              <div className="width-50 ride-time text-right mb-10">
                Rating: some stars
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Offer;
