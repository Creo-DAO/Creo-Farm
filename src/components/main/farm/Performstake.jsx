import React, { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RenderAlert from "./RenderAlert";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import utils from "web3-utils";

function PerformStake(props) {
  const textInput = useRef(null),
    checkInput = useRef(null);
  let { stakeId } = useParams();
  const [inputed, setInputed] = useState(false);
  const [approved, setApproved] = useState(true);
  const [routeId] = useState(stakeId);
  let { stake, approve, approving, staking, explorer } = props;
  const pool = stakeId.split("-").join("");
  const tokenType = stakeId.split("-")[0],
    rewardType = stakeId.split("-")[1],
    farmAppr = props[pool]?.farmAppr,
    apprhash = props[pool]?.currApprHash,
    apprStatus = props[pool]?.currApprStatus,
    stkhash = props[pool]?.currStkHash,
    stkStatus = props[pool]?.currStkStatus,
    token = props[`${tokenType}Token`];
  const apr = parseFloat(props[pool]?.apr).toFixed(2);
  let bal = props[`${tokenType}Bal`];
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
    farmAppr >= +textInput.current.value
      ? setApproved(true)
      : setApproved(false);
    +textInput.current.value > 0 && farmAppr >= +textInput.current.value
      ? setInputed(true)
      : setInputed(false);
  }
  function stakeAmt() {
    return (e) => {
      e.preventDefault();
      const checked = checkInput.current.checked;
      let amt;
      amt = textInput.current.value.toString() || "0";
      amt = utils.toWei(amt, "Ether");
      stake([amt, checked], `${pool}Pool`, tokenType);
    };
  }
  function apprvAmt() {
    return async (e) => {
      e.preventDefault();
      const toApprove = utils.toWei("10000", "ether");
      approve(toApprove, token, `${pool}Pool`);
    };
  }

  let content;
  if (routeId === "creo-lp" || routeId === "lp-lp" || routeId === "lp-creo") {
    content = (
      <div className="row justify-content-center">
        {approving === null && staking === null ? null : staking !== null &&
          approving !== null ? (
          <RenderAlert
            explorer={explorer}
            action={staking}
            status={stkStatus}
            hash={stkhash}
            type={"Staking"}
          />
        ) : staking !== null && approving === null ? (
          <RenderAlert
            explorer={explorer}
            action={staking}
            status={stkStatus}
            hash={stkhash}
            type={"Staking"}
          />
        ) : (
          <RenderAlert
            explorer={explorer}
            action={approving}
            status={apprStatus}
            hash={apprhash}
            type={"Approval"}
          />
        )}

        <div className="col-10 farm">
          <div className="row container">
            <div className="col-5 stake-terms">
              <div className="stake-form">
                <p className="mb-3 stake-form-head">
                  Stake {tokenType?.toUpperCase()} token, earn{" "}
                  {rewardType?.toUpperCase()} token
                </p>
                <p
                  style={{
                    color: "#000b31",
                    fontSize: "larger",
                    fontWeight: "bolder",
                    textAlign: "center",
                  }}
                >
                  {+apr === 0 || isNaN(+apr) ? "100" : apr} %
                </p>
                <p
                  style={{
                    color: "#000b31",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Current Annual Profit. <br />
                  Note: APR is not fixed, it is calculated based on current pool
                  balance.
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
                    Available Balance:{" "}
                    <span className="ms-lg-2">
                      {bal ? (bal = parseFloat(bal).toFixed(3)) : 0}{" "}
                      {tokenType.toUpperCase()}
                    </span>
                  </p>
                  <a
                    href={
                      tokenType === "lp"
                        ? "https://pancakeswap.finance/add/BNB/0xcB95881D76f93a401BBd47A2eB69FC33e9476795"
                        : "https://pancakeswap.finance/swap?outputCurrency=0xcb95881d76f93a401bbd47a2eb69fc33e9476795&inputCurrency=BNB"
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="text-decoration-none top-btn"
                  >
                    Top up
                  </a>
                </div>
                <form className="mt-4" onSubmit={stakeAmt()}>
                  <div
                    className="d-inline-flex justify-content-between"
                    style={{ borderBottom: `2px solid #8F8F8F`, width: "100%" }}
                  >
                    <input
                      className="stake-input"
                      type="number"
                      ref={textInput}
                      onChange={setValue}
                      placeholder="Enter Qty to Stake"
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
                    {tokenType === "creo" ? "Min CREO to stake is 5" : null}
                  </p>
                  {approved ? (
                    <div className="mt-3">
                      <input
                        id="agree"
                        type="checkbox"
                        className="checkbox-round"
                        placeholder="Enter Qty to Stake"
                        ref={checkInput}
                      />

                      <label className="ps-2" htmlFor="agree">
                        I agree to the above condition
                      </label>
                    </div>
                  ) : null}

                  <div className="d-flex justify-content-around">
                    {approved ? null : (
                      <button
                        type="button"
                        onClick={apprvAmt()}
                        className="btn btn-action  mt-2 list-stake "
                      >
                        Approve
                      </button>
                    )}
                    {inputed && approved ? (
                      <button
                        type="submit"
                        className="btn btn-action  mt-2 list-stake "
                      >
                        Stake
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-action  mt-2 list-stake disabled"
                      >
                        Stake
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
export default PerformStake;
