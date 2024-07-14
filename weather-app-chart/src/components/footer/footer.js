import React from "react";
import { Link } from "react-router-dom";

const footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 60,
        }}
      >
        <p style={{ fontSize: "30px", textAlign: "center", padding: "20px" }}>
         
          <span>
            <Link
              style={{ color: "black" }}
              className="nav-link"
              to={"https://github.com/mehreen019/hackCSB_disaster_management"}
            >
             
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default footer;