import React from "react";
import "../CSS/Header.css";

const Header = props => {
  return (
    <header>
      <h1 className="appHeader">The Real News</h1>
      <h2 className="apph2Header">Welcome {props.user}</h2>
    </header>
  );
};

export default Header;
