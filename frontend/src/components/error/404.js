import React, { Component } from "react";
import Header from "../partials/Header";

class error404 extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="width-80p center text-center ">
          <h1> 404 </h1>
          <p> The page you are looking for is not found</p>
        </div>
      </div>
    );
  }
}

export default error404;
