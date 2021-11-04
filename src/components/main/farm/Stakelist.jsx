import React from "react";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

function Stakelist(props) {
  let { url } = useRouteMatch();

  return props.term.map((term, i) => (
    <div className="list" key={`id${i}`}>
      <div className="list-item">
        <p style={{ fontSize: "small", fontWeight: "bolder" }}>
          Staking CREO {term.apr} APR
        </p>
        <div className="list-desc">
          <div className="list-apr pe-md-5">
            <p
              style={{
                color: "#000b31",
                fontSize: "larger",
                fontWeight: "bolder",
              }}
            >
              {term.apr}
            </p>
            <p style={{ fontSize: "12px", fontWeight: "bold" }}>
              {term.days} days annualized return
            </p>
          </div>
          <div className="list-bal ps-3">
            <p
              style={{
                color: "#000b31",
                fontSize: "larger",
                fontWeight: "bolder",
              }}
            >
              {term.bal}
            </p>
            <p style={{ fontSize: "12px", fontWeight: "bold" }}>
              Remaining Open Limit(CREO)
            </p>
          </div>
        </div>
        <div className="mt-1" style={{ textAlign: "center" }}>
          <Link
            to={`${url}/${props.type}-${term.days}days`}
            className="btn btn-action list-stake"
          >
            Stake creo
          </Link>
        </div>
      </div>
    </div>
  ));
}
export default Stakelist;
