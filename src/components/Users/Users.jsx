import React, { useEffect, useState } from "react";
import { getUsers } from "../api";
import UserCard from "./UserCard";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then(setUsers);
  }, []);
  return (
    <div>
      {users.map((user) => {
        return <UserCard key={user.username} userDetails={user} />;
      })}
    </div>
  );
}
