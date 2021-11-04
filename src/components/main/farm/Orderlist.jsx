import React, { Component } from "react";
import { Link } from "react-router-dom";

class Orderlist extends Component {
  render() {
    const { harvest } = this.props;
    return this.props.orders.map((order, i) => (
      <div className={order.staking ? "list" : "list d-none"} key={`id${i}`}>
        <div className="list-item">
          <p
            style={{
              color: "#000b31",
              fontWeight: "bolder",
              fontSize: "medium",
            }}
          >
            Staking {order.pair.toUpperCase()}{" "}
            {parseFloat(order.apr).toFixed(2)}% APR
          </p>
          <p style={{ fontSize: "small", fontWeight: "bold" }}>
            Expiration {order.exp} ({order.days})
          </p>
          <div className="list-desc pt-2">
            <div className="list-apr pe-md-5">
              <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                Holding amount ({order.pair.split("-")[0].toUpperCase()})
              </p>
              <p
                style={{
                  color: "#000b31",
                  // fontSize: "",
                  fontWeight: "bolder",
                }}
              >
                {order.staked}
              </p>
            </div>
            <div className="list-bal ps-5">
              <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                Creo Earned
              </p>
              <p
                style={{
                  color: "#000b31",
                  // fontSize: "larger",
                  fontWeight: "bolder",
                }}
              >
                {parseFloat(order.earned).toFixed(3)}
              </p>
            </div>
          </div>
          <div className="mt-4 d-flex justify-content-between">
            <Link
              to={`/farms/unstake/${order.pair}`}
              style={{ backgroundColor: "#08f8f7" }}
              // type="button"
              className="btn btn-action list-stake"
            >
              Unstake
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                const pool = order.pair.split("-").join("");
                harvest(`${pool}Pool`);
              }}
              style={{ backgroundColor: "#08f8f7", cursor: "pointer" }}
              className="btn btn-action list-stake "
            >
              Harvest
            </button>
          </div>
        </div>
      </div>
    ));
  }
}
export default Orderlist;
