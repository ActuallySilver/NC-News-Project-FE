import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="nav-bar">
      <Link className="Link" to="/">
        Articles
      </Link>
      <Link className="Link" to="/users">
        Users
      </Link>
    </div>
  );
}
