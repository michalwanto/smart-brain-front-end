import React from "react";
import "./Navigation.styles.css";

const Navigation = ({
  isSignedIn,
  registered,
  signedIn,
  signedOut,
  changeRoute,
}) => {
  return (
    <nav
      style={{ display: "flex", justifyContent: "flex-end", cursor: "pointer" }}
    >
      {isSignedIn ? (
        <p
          onClick={signedOut}
          className="f3 dim link black underline pa3 pointer"
        >
          Sign Out
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p
            onClick={signedIn}
            className="f3 dim link black underline pa3 pointer"
          >
            Sign In
          </p>
          <p
            onClick={() => changeRoute("register")}
            className="f3 dim link black underline pa3 pointer"
          >
            Register
          </p>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
