import React, { Component } from "react";
import Stakelist from "./Stakelist";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

class Stake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: {
        flexible: [
          {
            apr: "3.0%",
            bal: "10,000",
            days: "7",
          },
          {
            apr: "7.0%",
            bal: "10,000",
            days: "14",
          },
        ],
        fixed: [
          {
            apr: "14.0%",
            bal: "10,000",
            days: "30",
          },
          {
            apr: "25.0%",
            bal: "24,000",
            days: "90",
          },
        ],
      },
      currentTerm: "flexible",
    };
  }
  handleClick() {
    return (e) => {
      const clicked = e.target,
        curTerm = e.target
          .closest(".switch-ctr")
          .querySelector(".term-btn-active");
      curTerm.classList.remove("term-btn-active");
      clicked.classList.add("term-btn-active");
      this.setState({
        currentTerm: clicked.innerHTML === "Fixed term" ? "fixed" : "flexible",
      });
    };
  }
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-11 col-md-10 farm">
          <div className="row container">
            <div className="col-md-7 col stake-terms">
              <div className="term-switch">
                <div className="switch-ctr">
                  <button
                    className="term-btn term-btn-active"
                    onClick={this.handleClick()}
                  >
                    Flexible term
                  </button>
                  <button
                    onClick={this.handleClick()}
                    className="term-btn float-end"
                  >
                    Fixed term
                  </button>
                </div>
              </div>
              <div className="st-or-sm">
                <Link
                  to="/farms/orders"
                  className="view-orders pt-4 pe-0"
                  style={{ fontSize: "small", fontWeight: `bold` }}
                >
                  View Orders
                  <KeyboardArrowRightIcon />
                </Link>
              </div>
              <div className="term-lists">
                {this.state.currentTerm === "flexible" ? (
                  this.state.terms.flexible.length === 0 ? (
                    <div>
                      <p
                        className="mt-4 ps-5"
                        style={{
                          color: "#8f8f8f",
                          fontSize: "large",
                          fontWeight: "bolder",
                        }}
                      >
                        No data
                      </p>
                    </div>
                  ) : (
                    <Stakelist
                      term={this.state.terms.flexible}
                      type="flexible"
                    />
                  )
                ) : this.state.terms.fixed.length === 0 ? (
                  <div>
                    <p
                      className="mt-4 ps-5"
                      style={{
                        color: "#8f8f8f",
                        fontSize: "large",
                        fontWeight: "bolder",
                      }}
                    >
                      No data
                    </p>
                  </div>
                ) : (
                  <Stakelist term={this.state.terms.fixed} type="fixed" />
                )}
              </div>
            </div>
            <div className="col ms-auto pe-0 st-or">
              <Link
                to="/farms/orders"
                className="view-orders float-end pt-4 pe-0"
                style={{ fontSize: "small", fontWeight: `bold` }}
              >
                View Orders
                <KeyboardArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Stake;
