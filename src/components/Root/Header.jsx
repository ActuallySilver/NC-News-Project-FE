import React, { useContext } from "react";
import NavBar from "./NavBar";
import NcLogo from "../../images/NCNews_Logo.jpg";
import { UserContext } from "./UserContext";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <div className="Header">
      <div className="Header-top">
        <img className="header-nc-logo" src={NcLogo} alt="Site Logo" />
        <img className="logged-in-user" src={user.avatar_url} alt="current user" />
      </div>
      <NavBar />
    </div>
  );
}
