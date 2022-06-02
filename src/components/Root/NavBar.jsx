import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="nav-bar">
      <Link className="Nav-Bar-Link" to="/">
        ARTICLES <text className="navigation-down-arrow">˅</text>
      </Link>
      <Link className="Nav-Bar-Link" to="/users">
        USERS <text className="navigation-down-arrow">˅</text>
      </Link>
    </div>
  );
}
