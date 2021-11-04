import React, { Component } from "react";
import Brand from "./Brand";
import Navig from "./Navig";
import Navbutton from "./NavButtons";
import { withRouter } from "react-router";

class Navbar extends Component {
  render() {
    const { connect, acct, openModal } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Brand />
          <Navig />
          <Navbutton connect={connect} acct={acct} openModal={openModal} />
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
