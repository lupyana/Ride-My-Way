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
        <button class="open-button" onClick={this.openForm}>Give a Ride</button>
        <div class="form-popup" id="myForm">
          <form action="/action_page.php" class="form-container">
            <h1>Want to offer someone a ride  ?</h1>
            <p>We just need a few details</p>

            <label for="ride_start"><b>Starting point</b></label>
            <input type="text" placeholder="From" name="ride_start" required />

            <label for="ride_destination"><b>Destination</b></label>
            <input type="text" placeholder="To" name="ride_destination" required />

            <label for="ride_time"><b>Prefered time</b></label>
            <input type="text" placeholder="Time" name="ride_time" required />

            <label for="ride_fare"><b>Asking price</b></label>
            <input type="text" placeholder="Time" name="ride_fare" required />

            <button type="submit" class="btn" onClick={this.closeForm}>Submit</button>
            <button type="submit" class="btn cancel" onClick={this.closeForm}>Close</button>
          </form>
        </div>
      </div>
    );
  }
}

export default GiveARide;
