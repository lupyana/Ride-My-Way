import React, { Component } from "react";
// import { NavLink } from 'react-router-dom';

class Offer extends Component {
  render () {
    return (
      <div class="offer">
        <div class="padding-30">
            <div class="mb-20">
                <img src="https://via.placeholder.com/320x80" alt="" />
            </div>
            <div class="ride-details ">
              <div class="width-50 ride-start mb-10">
                Kkoo to Mbezi
              </div>
              <div class="width-50 ride-time text-right mb-10">
                Time: 1800 hrs
              </div>
            </div>
            <div class="ride-offerer">
              <div class="width-50 ride-start mb-10">
                <span class="avatar">With: </span> Benito
              </div>
              <div class="width-50 ride-time text-right mb-10">
                Rating: some stars
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Offer;
