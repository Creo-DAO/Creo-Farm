import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";

function Farmdetails(props) {
  const { param,earned } = props;
  return (
    <>
      <div className={`farm-action py-3 row no-display`}>
        <div className="col-4 col-md-3 ms-lg-auto ms-3 ">
          <div className="hrv">
            <div style={{ display: "block" }} className="me-lg-3">
              <div style={{ fontWeight: "300" }}>Creo earned</div>
              <div style={{ fontWeight: "bolder" }}>
                {parseFloat(earned).toFixed(3)}
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 ps-md-5 ps-3 ">
          <Link
            to={`/farms/stake/${param}`}
            className="btn btn-action mt-2"
            style={{ padding: "8px 20px", fontSize: "small" }}
          >
            Stake {param.split('-')[0].toUpperCase()}
          </Link>
          <Link
            to="/farms/orders"
            className="view-orders float-end pt-3 pe-md-3 pe-4"
            style={{ fontSize: "small" }}
          >
            View Orders
            <KeyboardArrowRightIcon />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Farmdetails;
