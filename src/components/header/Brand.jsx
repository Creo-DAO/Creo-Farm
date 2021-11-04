import React, { Component } from "react";
import logo from "../images/creo.png";
import { Link } from "react-router-dom";

class Brand extends Component {
  render() {
    return (
      <Link className="navbar-brand" to="/">
        <div className="brand">
          <img src={logo} alt="creo" className="d-inline-block" />
          <p>CREO</p>
        </div>
      </Link>
    );
  }
}

export default Brand;
