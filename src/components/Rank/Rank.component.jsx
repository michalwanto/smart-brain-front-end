import React from "react";
import "./Rank.styles.css";

const Rank = ({ name, entries }) => {
  return (
    <div className="rankDecription white f3 center">
      <div className="f3 white">{`${name} your number of entries is ...`}</div>
      <div className="f1 white"> {entries}</div>
    </div>
  );
};

export default Rank;
