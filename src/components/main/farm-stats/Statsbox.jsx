import { Component } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

class Statsbox extends Component {
  shortenAddr(addr) {
    const acct = [addr.slice(0, 6), addr.slice(-4)];
    return acct.join("...");
  }
  render() {
    const { creoBal, lpBal, creolp, lplp, lpcreo, acct, openModal, connect } =
      this.props;
    const bal = parseFloat(creoBal).toFixed(3);
    const balLp = parseFloat(lpBal).toFixed(3);
    const earn1 = creolp.earned ? parseFloat(creolp.earned) : 0,
      earn2 = lplp.earned ? parseFloat(lplp.earned) : 0,
      earn3 = lpcreo.earned ? parseFloat(lpcreo.earned).toFixed(3) : 0;
    let earned = +earn1 + +earn2 + +earn3;
    earned = parseFloat(earned).toFixed(3);
    return (
      <>
        <div className="col-lg-4 col-10 stats justify-contents-between text-center">
          <div
            className="stats-head-info"
            style={{ textAlign: "center", height: "10%" }}
          >
            <h3>Farms & Staking</h3>
          </div>
          <div style={{ overflowY: "scroll", height: "85%" }}>
            <div className="farm-stats">
              <p className="stat-head">Total Creo Supply </p>
              <p className="stat-value">100,000</p>
            </div>
            <div className="farm-stats">
              <p className="stat-head">Total Creo Burned </p>
              <p className="stat-value">5,000</p>
            </div>
            <div className="farm-stats">
              <p className="stat-head">CREO to harvest </p>
              <p className="stat-value">30000</p>
            </div>
            <div className="farm-stats">
              <p className="stat-head">CREO in wallet</p>
              <p className="stat-value">{!bal ? "N/A" : bal}</p>
            </div>
            <div className="farm-stats">
              <p className="stat-head">Lp Token in wallet</p>
              <p className="stat-value">{!balLp ? "N/A" : balLp}</p>
            </div>
            <div className="farm-stats">
              <p className="stat-head">CREO yielded</p>
              <p className="stat-value">{earned}</p>
            </div>
            <div className="farm-stats f-s-btn">
              {this.props.acct ? (
                <span className="addr" onClick={openModal()}>
                  {this.shortenAddr(acct)}
                </span>
              ) : (
                <button
                  type="button"
                  className="btn btn-action me-lg-2"
                  onClick={connect}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-10 stats-detailed">
          <div className="stats-head-info" style={{ textAlign: "center" }}>
            <h3>Creo Statistics</h3>
          </div>
          <div className="stats-body row">
            <div className="col px-4">
              <div className="farm-stats p-0">
                <p
                  className="stat-head text-center"
                  style={{ fontWeight: "bolder" }}
                >
                  Experts Review
                </p>
                <p className="fs-md-5" style={{ fontWeight: "300" }}>
                  Experts Review Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Quisque amet, feugiat bibendum nunc, in nunc
                  bibendum enim. Feugiat nulla porttitor ullamcorper aliquam.
                  Risus facilisis pharetra, elit tristique. Lacinia arcu purus
                  feugiat
                </p>
                <p>
                  <ThumbUpAltIcon />
                  <span style={{ display: "block", fontSize: "small" }}>
                    1.4k
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Statsbox;
