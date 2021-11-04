import { Component } from "react";
import Farmdetails from "./Farmdetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

class Farmlist extends Component {
  handleClick(clicked) {
    return (e) => {
      e.preventDefault();
      e.target
        .closest(`#farm${clicked}`)
        .querySelector(".farm-action")
        .classList.toggle("no-display");
    };
  }
  render() {
    return (
      <div className="all-farms">
        {this.props.farms.map((farm, i) => (
          <div
            key={`${i}id`}
            style={{ borderBottom: "1px solid #2c2a2a28" }}
            id={`farm${i}`}
          >
            <div className="row py-2 farm-info">
              <div className="col-lg-3 col-md-3 pair-box">
                <h6 className="pair">{farm.pair}</h6>
              </div>
              <div className="col-lg-3 col-md-2 pe-0 pe-md-3 apr-box">
                <div className="apr">Max. APR</div>
                <div>{farm.apr}</div>
              </div>
              <div className="col-lg-3 col-md-2 pe-0 pe-md-3 liq-box">
                <div className="liq">Farm Balance</div>
                <div>{parseFloat(farm.farmBal).toFixed(3)} CREO</div>
              </div>

              <div className="col-lg-2 col-md-2 px-0 px-md-3 details">
                <button
                  className="btn btn-lit det-btn"
                  onMouseDown={this.handleClick(i)}
                >
                  Details
                  <span>
                    <ExpandMoreIcon />
                  </span>
                </button>
              </div>
            </div>
            <Farmdetails
              earned={farm.earned}
              param={farm.pair.split(" ")[0].toLowerCase()}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Farmlist;
