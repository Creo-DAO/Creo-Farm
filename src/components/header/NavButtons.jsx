import { Component } from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";

class Navbutton extends Component {
  shortenAddr(addr) {
    const acct = [addr.slice(0, 6), addr.slice(-4)];
    return acct.join("...");
  }
  render() {
    const { connect, acct, openModal } = this.props;
    return (
      <>
        <div style={{ display: "inherit" }}>
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
          <ul className="nav justify-content-center big-social">
            <li className="nav-item" style={{ marginRight: "7px" }}>
              <a
                className="social-icon"
                href="https://t.me/CreoDAO"
                target="_blank"
                rel="noreferrer"
              >
                <TelegramIcon />
              </a>
            </li>
            <li className="nav-item">
              <a
                className=" social-icon"
                href="https://twitter.com/creodao?s=11"
                target="_blank"
                rel="noreferrer"
              >
                <TwitterIcon />
              </a>
            </li>
          </ul>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#toggleNav"
          aria-controls="offcanvasExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </>
    );
  }
}

export default Navbutton;
