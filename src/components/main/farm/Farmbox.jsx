import React, { Component } from "react";
import Farmlist from "./Farmlist";

class Farmbox extends Component {
  constructor(props) {
    super(props);
    const { creolp, lplp, lpcreo } = this.props;
    this.state = {
      farms: [
        {
          pair: `CREO-LP`,
          earned: creolp.earned || 0,
          apr: +creolp.apr > 0 ? `${parseFloat(creolp.apr).toFixed(2)}%` : null,
          farmBal: creolp.farmBal || 0,
        },
        {
          pair: `LP-LP (CREO-BNB)`,
          earned: lplp?.earned || 0,
          apr: +lplp.apr > 0 ? `${parseFloat(lplp.apr).toFixed(2)}%` : null,
          farmBal: lplp?.farmBal || 0,
        },
        {
          pair: `LP-CREO (CREO-BNB)`,
          earned: lpcreo?.earned || 0,
          apr: +lpcreo.apr > 0 ? `${parseFloat(lpcreo.apr).toFixed(2)}%` : null,
          farmBal: lpcreo?.farmBal || 0,
        },
      ],
    };
  }
  render() {
    const { creoBal } = this.props;
    return (
      <div className="row justify-content-center">
        <div className="col-11 col-md-10 farm">
          <div className="farm-head">
            <div>
              <h2>Farms</h2>
              <p>Stake LP tokens to earn CREO</p>
            </div>
            <div className="ms-auto">
              <h2>{parseFloat(creoBal).toFixed(3) || "N/A"}</h2>
              <p>CREO in wallet</p>
            </div>
          </div>
          <Farmlist farms={this.state.farms} />
        </div>
      </div>
    );
  }
}

export default Farmbox;
