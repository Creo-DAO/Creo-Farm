import React, { Component } from "react";
import Statsbox from "./Statsbox";

class FarmStats extends Component {
  render() {
    const { creoBal, lpBal, creolp, lplp, lpcreo, acct, openModal, connect } =
      this.props;
    return (
      <main className="main">
        <div className="container ">
          <Statsbox
            creoBal={creoBal}
            lpBal={lpBal}
            creolp={creolp}
            lplp={lplp}
            lpcreo={lpcreo}
            connect={connect}
            acct={acct}
            openModal={openModal}
          />
        </div>
      </main>
    );
  }
}

export default FarmStats;
