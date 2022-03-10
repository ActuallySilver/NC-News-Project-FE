import React, { useContext } from "react";
import NavBar from "./NavBar";
import { UserContext } from "./UserContext";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <div className="Header">
      <h3>{user.username}</h3>
      <h1>NC News</h1>
      <NavBar />
    </div>
  );
}
