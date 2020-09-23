import React from "react";
import "./Logo.styles.css";
import Tilt from "react-tilt";

const Logo = () => {
  return (
    <div className="Logo ma4 nt0 ">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 25 }}
        style={{ height: 150, width: 150 }}
      >
        <div
          className="Tilt-inner"
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <img alt="" src="https://img.icons8.com/fluent/96/000000/brain.png" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
