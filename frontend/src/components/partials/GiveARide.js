import React, { Component } from "react";
import '../../css/form.css';

class GiveARide extends Component {
  openForm() {
    document.getElementById("myForm").style.display = "block";
  }

  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  render() {
    return (
      <div>
        <button className="open-button" onClick={this.openForm}>Give a Ride</button>
        <div className="form-popup" id="myForm">
          <form action="/action_page.php" className="form-container">
            <h1>Want to offer someone a ride  ?</h1>
            <p>We just need a few details</p>

            <label htmlFor="ride_start"><b>Starting point</b></label>
            <input type="text" placeholder="From" name="ride_start" required />

            <label htmlFor="ride_destination"><b>Destination</b></label>
            <input type="text" placeholder="To" name="ride_destination" required />

            <label htmlFor="ride_time"><b>Prefered time</b></label>
            <input type="text" placeholder="Time" name="ride_time" required />

            <label htmlFor="ride_fare"><b>Asking price</b></label>
            <input type="text" placeholder="Time" name="ride_fare" required />

            <button type="submit" className="btn" onClick={this.closeForm}>Submit</button>
            <button type="submit" className="btn cancel" onClick={this.closeForm}>Close</button>
          </form>
        </div>
      </div>
    );
  }
}

export default GiveARide;
