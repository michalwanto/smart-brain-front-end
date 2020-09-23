import React from "react";
import "./ImageDisplay.styles.css";

const ImageDisplay = ({ ImageUrl, Box }) => {
  return (
    <div className="extraContainer">
      <div className="center" style={{ position: "relative", width: "500px" }}>
        <img
          id="imageDisplay"
          alt=""
          src={`${ImageUrl}`}
          className="center imageDisplay"
          style={{ width: "500px", heigh: "auto" }}
        />
        <div
          className="bounding_box"
          style={{
            top: Box.topRow,
            bottom: Box.bottomRow,
            right: Box.rightCol,
            left: Box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ImageDisplay;
