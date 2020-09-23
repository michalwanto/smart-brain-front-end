import React from "react";
import "./ImageTextForm.styles.css";

const ImageTextForm = ({ onInputChange, onPictureChange }) => {
  return (
    <div className="IMFContainer ma4 nt0 ">
      <p>{"This brain will detect faces on your pictures. Give it a try!"}</p>
      <div className="inputContainer center shadow-5 br3">
        <input
          onChange={onInputChange}
          type="tex"
          className="center pa2 w-70 f4"
        />
        <button
          onClick={onPictureChange}
          className="w-30 grow f4 link center pointer white ph3 bg-light-purple dib  pv2"
        >
          {"Detect"}
        </button>
      </div>
    </div>
  );
};

export default ImageTextForm;
