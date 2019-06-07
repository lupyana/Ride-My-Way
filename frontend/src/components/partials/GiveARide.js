import React, { Component } from "react";
import "../../css/form.css";

class GiveARide extends Component {
  openForm() {
    document.getElementById("myForm").style.display = "block";
  }

  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  addItem(e) {
    e.preventDefault();
    this.props.handler({
      from: this.ride_start.value,
      to: this.ride_destination.value,
      with: "John Doe",
      time: this.ride_fare.value
    });

    //reset the form
    this.give_ride_form.reset();

    //Close the form
    this.closeForm();
  }

  render() {
    return (
      <div>
        <button className="open-button" onClick={this.openForm}>
          Give a Ride
        </button>
        <div className="form-popup" id="myForm">
          <form
            ref={input => (this.give_ride_form = input)}
            className="form-container"
            onSubmit={e => {
              this.addItem(e);
            }}
          >
            <h1>Want to offer someone a ride ?</h1>
            <p>We just need a few details</p>

            <label htmlFor="ride_start">
              <b>Starting point</b>
            </label>
            <input
              ref={input => (this.ride_start = input)}
              type="text"
              placeholder="From"
              name="ride_start"
              required
            />

            <label htmlFor="ride_destination">
              <b>Destination</b>
            </label>
            <input
              ref={input => (this.ride_destination = input)}
              type="text"
              placeholder="To"
              name="ride_destination"
              required
            />

            <label htmlFor="ride_time">
              <b>Prefered time in 24hrs</b>
            </label>
            <input
              ref={input => (this.ride_time = input)}
              type="text"
              placeholder="Time"
              name="ride_time"
              required
            />

            <label htmlFor="ride_fare">
              <b>Asking price</b>
            </label>
            <input
              type="text"
              ref={input => (this.ride_fare = input)}
              placeholder="Price"
              name="ride_fare"
              required
            />

            <button type="submit" className="btn">
              Submit
            </button>
            <button
              type="submit"
              className="btn cancel"
              onClick={this.closeForm}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default GiveARide;
