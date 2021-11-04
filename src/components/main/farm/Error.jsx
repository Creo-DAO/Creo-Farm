import React from "react";
import {Link} from 'react-router-dom'

function Errorpage(props) {
  return (
    <main className="main">
      <div className="container">
        <p className="text-center fs-4" style={{ color: "#fff" }}>
          {" "}
          ERROR: Page Not Found{" "}
          <Link to="/" style={{ color: "#fff" }} className=" top-btn">
            home
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Errorpage;
