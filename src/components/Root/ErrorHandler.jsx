import React from "react";

export default function ErrorHandler({ error }) {
  return (
    <div>
      <h2>{error.code}</h2>
      <h3>{error.msg}</h3>
    </div>
  );
}
