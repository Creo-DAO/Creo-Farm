import React, { Component } from "react";
import Orderlist from "./Orderlist";
import RenderAlert from "./RenderAlert";

class Orders extends Component {
  constructor(props) {
    super(props);
    const { creolp, lplp, lpcreo } = this.props;
    this.state = {
      orders: {
        active: [
          {
            pair: `creo-lp`,
            pool: "creolpPool",
            apr: creolp.apr || 0,
            staked: creolp.stakingBal || 0,
            earned: creolp.earned || 0,
            staking: creolp.isStaking || creolp.earned > 0,
            exp: "2021-12-12",
            days: "flexible",
          },
          {
            pair: `lp-lp`,
            apr: lplp.apr || 0,
            staked: lplp.stakingBal || 0,
            staking: lplp.isStaking || lplp.earned > 0,
            earned: lplp.earned || 0,
            exp: "2021-12-12",
            days: "flexible",
          },
          {
            pair: `lp-creo`,
            apr: lpcreo?.apr || 0,
            staked: lpcreo?.stakingBal || 0,
            staking: lpcreo?.isStaking || lpcreo?.earned > 0,
            earned: lpcreo?.earned || 0,
            exp: "2021-12-12",
            days: "flexible",
          },
        ],
        finished: [],
      },
      currentTerm: "active",
      pool1: creolp,
      pool2: lplp,
      pool3: lpcreo,
    };
  }
  handleClick() {
    return (e) => {
      const clicked = e.target,
        curTerm = e.target
          .closest(".switch-ctr")
          .querySelector(".order-btn-active");
      curTerm.classList.remove("order-btn-active");
      clicked.classList.add("order-btn-active");
      this.setState({
        currentTerm: clicked.innerHTML === "Active" ? "active" : "finished",
      });
    };
  }

  render() {
    const {
      harvest,
      explorer,
      harvestingcreolpPool,
      harvestinglplpPool,
      harvestinglpcreoPool,
    } = this.props;
    const { pool1, pool2, pool3 } = this.state;
    return (
      <div className="row justify-content-center">
        <RenderAlert
          explorer={explorer}
          action={harvestingcreolpPool}
          status={pool1?.currHrvStatus}
          hash={pool1?.currHrvHash}
          type={"Harvesting"}
        />
        <RenderAlert
          explorer={explorer}
          action={harvestinglplpPool}
          status={pool2?.currHrvStatus}
          hash={pool2?.currHrvHash}
          type={"Harvesting"}
        />
        <RenderAlert
          explorer={explorer}
          action={harvestinglpcreoPool}
          status={pool3?.currHrvStatus}
          hash={pool3?.currHrvHash}
          type={"Harvesting"}
        />
        <div className="col-10 farm">
          <div className="row container">
            <div className="col-7 stake-terms">
              <div className="term-switch">
                <div className="switch-ctr">
                  <button
                    className="order-btn order-btn-active"
                    onClick={this.handleClick()}
                  >
                    Active
                  </button>
                  <button
                    onClick={this.handleClick()}
                    className="order-btn float-end"
                  >
                    Finished
                  </button>
                </div>
              </div>
              <div className="term-lists">
                {this.state.currentTerm === "active" ? (
                  this.state.orders.active.length === 0 ? (
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
                    <Orderlist
                      orders={this.state.orders.active}
                      harvest={harvest}
                      // errHandler={this.errHandler.bind(this)}
                    />
                  )
                ) : this.state.orders.finished.length === 0 ? (
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
                  <Orderlist orders={this.state.orders.finished} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Orders;
