import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Root/UserContext";

export default function UserCard({ userDetails }) {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div>
      <h2>{userDetails.username}</h2>
      <h3>{userDetails.name}</h3>
      <img src={userDetails.avatar_url} alt={userDetails.username} />
      <button
        onClick={() => {
          setUser(userDetails);
          navigate("/");
        }}
      >
        Login
      </button>
    </div>
  );
}
