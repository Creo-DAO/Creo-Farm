import React, { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RenderAlert from "./RenderAlert";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import utils from "web3-utils";

function Unstake(props) {
  const textInput = useRef(null);
  let { unstakeId } = useParams();
  const [routeId] = useState(unstakeId);
  const { unStake, unstaking, explorer } = props;
  const pool = unstakeId.split("-").join(""),
    tokenType = unstakeId.split("-")[0],
    ustkhash = props[pool]?.currUstkHash,
    ustkStatus = props[pool]?.currUstkStatus;
  const apr = parseFloat(props[pool]?.apr).toFixed(2) || null,
    earned = props[pool]?.earned;
  let bal = props[pool]?.stakingBal;
  const [inputed, setInputed] = useState(false);
  function allBal(e) {
    e.preventDefault();
    if (bal) {
      bal = parseFloat(bal).toFixed(3);
      textInput.current.value = bal;
      setValue(e);
    }
  }
  function setValue(e) {
    e.preventDefault();
    +textInput.current.value > 0 ? setInputed(true) : setInputed(false);
  }
  function unStakeAmt() {
    return (e) => {
      e.preventDefault();
      let amt;
      amt = textInput.current.value.toString();
      amt = utils.toWei(amt, "Ether");
      unStake(amt, `${pool}Pool`);
    };
  }
  let content;
  if (routeId === "creo-lp" || routeId === "lp-lp" || routeId === "lp-creo") {
    content = (
      <div className="row justify-content-center">
        <RenderAlert
          explorer={explorer}
          action={unstaking}
          status={ustkStatus}
          hash={ustkhash}
          type={"Unstaking"}
        />
        <div className="col-10 farm">
          <div className="row container">
            <div className="col-5 stake-terms">
              <div className="stake-form">
                <p className="mb-3 stake-form-head">
                  {" "}
                  Staking {tokenType.toUpperCase()} {parseFloat(apr).toFixed(2)}
                  % APR
                </p>
                <p
                  style={{
                    color: "#000b31",
                    fontSize: "larger",
                    fontWeight: "bolder",
                    textAlign: "center",
                  }}
                >
                  {earned ? parseFloat(earned).toFixed(3) : 0} {"CREO"}
                </p>
                <p
                  style={{
                    color: "#000b31",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Rewards Balance
                </p>
                <div
                  className="d-inline-flex mt-3 justify-content-between"
                  style={{ width: "100%" }}
                >
                  <p
                    style={{
                      fontSize: "small",
                      fontWeight: "bold",
                      color: "#8F8F8F",
                    }}
                    className=""
                  >
                    Staking Balance:{" "}
                    <span className="ms-lg-2">
                      {bal ? bal : 0} {tokenType.toUpperCase()}{" "}
                    </span>
                  </p>
                  {/* <button className=" top-btn">Top up</button> */}
                </div>
                <form className="mt-4" onSubmit={unStakeAmt()}>
                  <div
                    className="d-inline-flex justify-content-between"
                    style={{ borderBottom: `2px solid #8F8F8F`, width: "100%" }}
                  >
                    <input
                      className="stake-input"
                      type="number"
                      ref={textInput}
                      onChange={setValue}
                      placeholder="Enter Qty to Unstake"
                    />
                    <button className="all-btn" onClick={allBal}>
                      All
                    </button>
                  </div>
                  <p
                    style={{
                      color: "#000b31",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {tokenType === "creo"
                      ? "Min stake balance is 5 Creo"
                      : null}
                  </p>

                  <div style={{ textAlign: "center" }}>
                    {inputed ? (
                      <button
                        type="submit"
                        className="btn btn-action  mt-2 list-stake "
                      >
                        Unstake
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-action  mt-2 list-stake disabled"
                      >
                        Unstake
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className="col ms-auto pe-0 st-or">
              <Link
                to="/farms/orders"
                className="view-orders float-end pt-4 pe-0"
                style={{ fontSize: "small" }}
              >
                View Orders
                <KeyboardArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    content = (
      <p className="text-center fs-4" style={{ color: "#fff" }}>
        {" "}
        ERROR: Page Not Found{" "}
        <Link to="/" style={{ color: "#fff" }} className=" top-btn">
          home
        </Link>
      </p>
    );
  }
  return content;
}
export default Unstake;
